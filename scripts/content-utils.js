const fs = require("fs");
const path = require("path");

function parseValue(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "";

  if (normalized.includes(",")) {
    return normalized
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return normalized;
}

function parseMarkdown(raw) {
  const text = String(raw ?? "");
  if (!text.startsWith("---")) {
    return { meta: {}, content: text.trim() };
  }

  const endIndex = text.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { meta: {}, content: text.trim() };
  }

  const frontmatter = text.slice(3, endIndex).trim();
  const content = text.slice(endIndex + 4).trim();
  const meta = {};

  frontmatter.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1);
    meta[key] = parseValue(value);
  });

  return { meta, content };
}

function readMarkdownEntries(subDir) {
  const directory = path.join(process.cwd(), "src", "content", subDir);
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(directory, file));

  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const stat = fs.statSync(filePath);
    const { meta, content } = parseMarkdown(raw);
    return {
      filePath,
      meta,
      content,
      updatedAt: stat.mtime.toISOString(),
    };
  });
}

module.exports = {
  parseMarkdown,
  readMarkdownEntries,
};
