import {
  createMessage as createMessageRecord,
  listMessages,
} from "@/repositories/messageRepository";

const USERNAME_MAX_LENGTH = 24;
const CONTENT_MAX_LENGTH = 500;
const SUBMIT_INTERVAL_MS = 15 * 1000;
let lastSubmittedAt = 0;
const BLOCKED_KEYWORDS = ["赌博", "诈骗", "色情", "违法"];

function hasBlockedKeyword(content) {
  const safeContent = String(content ?? "");
  return BLOCKED_KEYWORDS.some((word) => safeContent.includes(word));
}

function mapFetchError(error) {
  const message = String(error?.message ?? "");

  if (message.includes("Invalid API key") || message.includes("JWT")) {
    return "Supabase 鉴权失败，请检查 VITE_SUPABASE_ANON_KEY";
  }

  if (message.includes("Failed to fetch")) {
    return "无法连接 Supabase，请检查 VITE_SUPABASE_URL、网络或 CORS 配置";
  }

  if (message.includes("permission denied") || message.includes("row-level security")) {
    return "读取被拒绝，请在 Supabase 为 messages 表配置 SELECT 的 RLS 策略";
  }

  if (message.includes("relation") && message.includes("does not exist")) {
    return "messages 表不存在，请检查表名和项目环境";
  }

  return "获取留言失败，请刷新后重试";
}

function mapSubmitError(error) {
  const message = String(error?.message ?? "");

  if (message.includes("permission denied") || message.includes("row-level security")) {
    return "写入被拒绝，请在 Supabase 为 messages 表配置 INSERT 的 RLS 策略";
  }

  if (message.includes("Failed to fetch")) {
    return "无法连接 Supabase，请检查网络和项目地址配置";
  }

  return "留言提交失败，请稍后重试";
}

function normalizeInput(value) {
  return String(value ?? "").trim();
}

function validateMessageInput({ username, content }) {
  const normalizedUsername = normalizeInput(username);
  const normalizedContent = normalizeInput(content);

  if (!normalizedUsername || !normalizedContent) {
    throw new Error("请填写名字和留言内容");
  }

  if (normalizedUsername.length > USERNAME_MAX_LENGTH) {
    throw new Error(`名字不能超过 ${USERNAME_MAX_LENGTH} 个字符`);
  }

  if (normalizedContent.length > CONTENT_MAX_LENGTH) {
    throw new Error(`留言不能超过 ${CONTENT_MAX_LENGTH} 个字符`);
  }

  if (hasBlockedKeyword(normalizedContent)) {
    throw new Error("留言内容包含敏感词，请调整后再提交");
  }

  return {
    username: normalizedUsername,
    content: normalizedContent,
  };
}

export async function fetchMessageList() {
  try {
    const list = await listMessages({ limit: 50 });
    return list.map((message) => ({
      ...message,
      content: String(message.content ?? ""),
      status: hasBlockedKeyword(message.content) ? "pending" : "approved",
    }));
  } catch (error) {
    console.error("获取留言失败:", error);
    throw new Error(mapFetchError(error));
  }
}

export async function submitMessage(input) {
  if (Date.now() - lastSubmittedAt < SUBMIT_INTERVAL_MS) {
    const waitSeconds = Math.ceil((SUBMIT_INTERVAL_MS - (Date.now() - lastSubmittedAt)) / 1000);
    throw new Error(`提交太频繁，请 ${waitSeconds} 秒后再试`);
  }

  const payload = validateMessageInput(input);

  try {
    const created = await createMessageRecord(payload);
    lastSubmittedAt = Date.now();
    return { ...created, status: "approved" };
  } catch (error) {
    console.error("提交留言失败:", error);
    throw new Error(mapSubmitError(error));
  }
}

export function getMessageConstraints() {
  return {
    usernameMaxLength: USERNAME_MAX_LENGTH,
    contentMaxLength: CONTENT_MAX_LENGTH,
    submitIntervalMs: SUBMIT_INTERVAL_MS,
    blockedKeywords: BLOCKED_KEYWORDS,
  };
}
