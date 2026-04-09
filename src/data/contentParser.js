function parseMetaValue(value) {
  const normalized = value.trim();
  if (!normalized) {
    return "";
  }

  if (normalized.includes(",")) {
    return normalized
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return normalized;
}

export function parseMarkdownEntry(raw) {
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

  for (const line of frontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1);
    meta[key] = parseMetaValue(value);
  }

  return { meta, content };
}
