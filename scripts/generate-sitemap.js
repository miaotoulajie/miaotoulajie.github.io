const fs = require("fs");
const path = require("path");
const { readMarkdownEntries } = require("./content-utils");

function trimSlash(input) {
  return String(input || "").replace(/\/+$/, "");
}

function toUrl(baseUrl, routePath) {
  const base = trimSlash(baseUrl);
  const route = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${base}${route}`;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

function makeEntry(baseUrl, routePath, options = {}) {
  return {
    loc: toUrl(baseUrl, routePath),
    lastmod: formatDate(options.lastmod),
    changefreq: options.changefreq || "weekly",
    priority: options.priority || "0.6",
  };
}

function run() {
  const siteUrl = process.env.SITE_URL || "https://miaotoulajie.github.io";
  const projects = readMarkdownEntries("projects");
  const posts = readMarkdownEntries("posts");
  const now = new Date().toISOString();

  const staticEntries = [
    makeEntry(siteUrl, "/", { lastmod: now, changefreq: "weekly", priority: "1.0" }),
    makeEntry(siteUrl, "/projects", { lastmod: now, changefreq: "weekly", priority: "0.9" }),
    makeEntry(siteUrl, "/blog", { lastmod: now, changefreq: "weekly", priority: "0.9" }),
    makeEntry(siteUrl, "/about", { lastmod: now, changefreq: "monthly", priority: "0.7" }),
    makeEntry(siteUrl, "/contact", { lastmod: now, changefreq: "monthly", priority: "0.7" }),
    makeEntry(siteUrl, "/message", { lastmod: now, changefreq: "daily", priority: "0.8" }),
  ];
  const projectEntries = projects.map((entry) =>
    makeEntry(siteUrl, `/projects/${entry.meta.id}`, {
      lastmod: entry.updatedAt,
      changefreq: "monthly",
      priority: "0.8",
    })
  );
  const postEntries = posts.map((entry) =>
    makeEntry(siteUrl, `/blog/${entry.meta.id}`, {
      lastmod: entry.meta.publishedAt || entry.updatedAt,
      changefreq: "monthly",
      priority: "0.8",
    })
  );
  const allEntries = [...staticEntries, ...projectEntries, ...postEntries];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map(
      (entry) =>
        `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`
    ),
    "</urlset>",
    "",
  ].join("\n");

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf8");
  console.log(`✅ 已生成 sitemap：${outputPath}（共 ${allEntries.length} 条）`);
}

try {
  run();
} catch (error) {
  console.error(`❌ 生成 sitemap 失败: ${error.message}`);
  process.exit(1);
}
