# miao.github.io

Personal website built with Vue 3 + Vite + Supabase.

## Local development

1. Copy `.env.example` to `.env`.
2. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run:

```bash
npm install
npm run dev
```

## Content workflow

- Projects: `src/content/projects/*.md`
- Posts: `src/content/posts/*.md`

Build will automatically:

- validate markdown frontmatter (`npm run validate:content`)
- generate sitemap (`npm run generate:sitemap`)

## Deploy

GitHub Actions workflow uses:

- `npm ci` + npm cache
- `SITE_URL` env var (repository variable) for sitemap domain
