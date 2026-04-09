import { parseMarkdownEntry } from "@/data/contentParser";

const projectModules = import.meta.glob("/src/content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const projects = Object.values(projectModules)
  .map((raw) => {
    const { meta, content } = parseMarkdownEntry(raw);
    return {
      id: meta.id,
      title: meta.title,
      summary: meta.summary,
      stack: Array.isArray(meta.stack) ? meta.stack : [],
      role: meta.role,
      result: meta.result,
      link: `/projects/${meta.id}`,
      detail: content,
    };
  })
  .filter((item) => item.id);
