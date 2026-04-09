const { readMarkdownEntries } = require("./content-utils");

function assertRequired(entry, requiredFields) {
  const missing = requiredFields.filter((field) => !entry.meta[field]);
  if (missing.length > 0) {
    throw new Error(
      `${entry.filePath} 缺少字段: ${missing.join(", ")}`
    );
  }
}

function validateUniqueIds(entries, type) {
  const idMap = new Map();
  entries.forEach((entry) => {
    const id = entry.meta.id;
    if (idMap.has(id)) {
      throw new Error(
        `${type} 存在重复 id: "${id}"\n- ${idMap.get(id)}\n- ${entry.filePath}`
      );
    }
    idMap.set(id, entry.filePath);
  });
}

function validateDate(entry) {
  const date = new Date(entry.meta.publishedAt);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${entry.filePath} 的 publishedAt 不是有效日期`);
  }
}

function run() {
  const projectEntries = readMarkdownEntries("projects");
  const postEntries = readMarkdownEntries("posts");

  projectEntries.forEach((entry) => {
    assertRequired(entry, ["id", "title", "summary", "stack", "role", "result"]);
  });

  postEntries.forEach((entry) => {
    assertRequired(entry, ["id", "title", "summary", "tags", "publishedAt"]);
    validateDate(entry);
  });

  validateUniqueIds(projectEntries, "projects");
  validateUniqueIds(postEntries, "posts");

  console.log(
    `✅ 内容校验通过：projects ${projectEntries.length} 篇，posts ${postEntries.length} 篇`
  );
}

try {
  run();
} catch (error) {
  console.error(`❌ 内容校验失败: ${error.message}`);
  process.exit(1);
}
