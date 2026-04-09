import { parseMarkdownEntry } from "@/data/contentParser";

const postModules = import.meta.glob("/src/content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts = Object.values(postModules)
  .map((raw) => {
    const { meta, content } = parseMarkdownEntry(raw);
    return {
      id: meta.id,
      title: meta.title,
      summary: meta.summary,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      publishedAt: meta.publishedAt,
      content,
    };
  })
  .filter((item) => item.id)
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
