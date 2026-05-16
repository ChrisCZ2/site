# Adding content (without breaking the UI)

The site is built so **you only add files and frontmatter** — layouts, nav, and section cards update automatically.

## Golden rules

1. **Never edit** `index.astro` layout structure unless you are adding a whole new section type.
2. **Add posts as `.mdx` files** in the correct folder (see below).
3. **Use valid frontmatter** — wrong types (e.g. `severity: urgent`) will fail `npm run build`.
4. **Set `draft: true`** to hide a post while you work; set `draft: false` when ready.
5. **Run `npm run build`** before deploy — Astro will tell you if something is wrong.
6. **GIFs only in** `public/media/gifs/` and `src/config/media.ts` / `src/config/sections.ts` — do not hot-link random URLs in components.

---

## Section map

| Section | Add files here | Archive URL | Topic filters |
|--------|----------------|-------------|---------------|
| **Writeups & Labs** | `src/content/writeups/*.mdx` | `/blog` (list), `/writeups/{slug}` (post) | `/web-app-security`, `/api-secuirty`, `/cloud-security`, `/ctfs` |
| **Fitness / Life** | `src/content/fitness/*.mdx` | `/fitness` (list), `/fitness/{slug}` (post) | — |

Home page shows the latest **3 fitness** posts automatically. Writeups are listed on `/blog`.

Section GIFs (home + footer): edit **`src/config/sections.ts`** only.

---

## Writeups & Labs

**File:** `src/content/writeups/my-slug.mdx`  
**URL:** `https://yoursite.com/writeups/my-slug`

```mdx
---
title: 'Short title'
description: 'One line for cards and SEO (under ~200 chars).'
pubDate: 2026-05-16
severity: high
category: 'web-app-security'
coverImage: 'https://chriscz.com/wp-content/uploads/2025/07/example.webp'
tags: ['web_app_security', 'idor']
draft: false
---

## Summary

Your content in Markdown...

![screenshot](https://example.com/image.png)
```

### Frontmatter reference

| Field | Required | Values |
|-------|----------|--------|
| `title` | yes | string |
| `description` | yes | string |
| `pubDate` | yes | `YYYY-MM-DD` |
| `severity` | yes | `critical` \| `high` \| `medium` \| `low` \| `info` |
| `category` | yes | `web-app-security` \| `api-secuirty` \| `cloud-security` \| `ctfs` |
| `coverImage` | no | image URL (card thumbnail) |
| `program` | no | string |
| `tags` | no | string array |
| `draft` | no | `true` hides post |

**Slug** = filename without `.mdx` (use lowercase and hyphens).

---

## Fitness / Life

**File:** `src/content/fitness/my-slug.mdx`  
**URL:** `https://yoursite.com/fitness/my-slug`

```mdx
---
title: 'Post title'
description: 'One line summary.'
pubDate: 2026-05-16
tags: [fitness, gym]
coverImage: '/media/gifs/hacker-3.gif'
draft: false
---

## Heading

Write normally in Markdown...
```

| Field | Required | Values |
|-------|----------|--------|
| `title` | yes | string |
| `description` | yes | string |
| `pubDate` | yes | `YYYY-MM-DD` |
| `tags` | no | string array |
| `coverImage` | no | URL or `/media/...` path |
| `draft` | no | `true` / `false` |

---

## Topic archive pages (Web App, API, Cloud, CTF)

No extra files. Tag writeups with `category` in frontmatter:

- `web-app-security` → appears on `/web-app-security`
- `api-secuirty` → `/api-secuirty`
- `cloud-security` → `/cloud-security`
- `ctfs` → `/ctfs`

---

## Site copy (name, stats, about)

Edit **`src/config/site.ts`** only:

- `name`, `handle`, `tagline`, `description`, `url`
- `stats.reports`, `stats.highCritical`, `stats.programs`
- `about` (WHO IS section — use `\n\n` between paragraphs)
- `skills` (chip list if re-enabled)

---

## Navigation & footer links

Edit **`src/config/navigation.ts`**:

- `mainNav` — header
- `footerColumns` — footer columns

Use paths that already exist (e.g. `/blog`, `/fitness`). Wrong paths 404 but won’t break the build.

---

## Section GIFs (home cards + footer picker)

1. Put GIF files in **`public/media/gifs/`** (keep files small; aim for &lt; 2MB each).
2. Update paths in **`src/config/media.ts`** if filenames change.
3. Assign to sections in **`src/config/sections.ts`** (`gif` on each section).

Do **not** embed GIFs inside MDX for section cards — only the config drives those.

---

## New top-level page (optional)

1. Create `src/pages/my-page.astro` using `PageLayout`.
2. Add `{ href: '/my-page', label: 'Label' }` to `src/config/navigation.ts`.

See `src/pages/_example-new-section.astro.example`.

---

## Checklist before publish

```bash
npm run build
```

Fix any schema errors, then:

```bash
npm run dev
```

Click: Home → section cards → `/blog` → one writeup → `/fitness` → one fitness post.
