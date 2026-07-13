# Creating Posts — Complete Guide

Everything you need to add, configure, publish, and troubleshoot posts on the site.
No coding required — posts are just Markdown files with a small settings block on top.

---

## 1. The two kinds of posts

| Type | Folder | Becomes URL | Shows up on |
|------|--------|-------------|-------------|
| **Writeup** (security/research) | `src/content/writeups/` | `/writeups/<filename>` | `/blog` (Work) + the matching category page |
| **Fitness / Life** | `src/content/fitness/` | `/fitness/<filename>` | `/fitness` |

The **file name = the URL slug**. Example: `src/content/writeups/ssrf-image-proxy.mdx` → `https://yoursite/writeups/ssrf-image-proxy`.

Use `.mdx` (recommended) or `.md`. Both are picked up automatically. Use lowercase-with-dashes for file names (no spaces).

---

## 2. Quick start (writeup)

1. Create a file: `src/content/writeups/my-finding.mdx`
2. Paste this and edit it:

```mdx
---
title: 'SSRF in the image proxy'
description: 'One-line summary that appears on list cards and in search/social previews.'
pubDate: 2026-07-01
severity: high
category: 'web-app-security'
tags: ['ssrf', 'web']
draft: false
---

## Summary

Write the writeup body here in normal Markdown.
```

3. Save. With `npm run dev` running, refresh the browser — it's live at `/writeups/my-finding`.

---

## 3. Quick start (fitness / life)

1. Create a file: `src/content/fitness/my-post.mdx`
2. Paste this and edit it:

```mdx
---
title: 'Weekend reset'
description: 'One-line summary for the list.'
pubDate: 2026-07-01
tags: ['recovery']
draft: false
---

Body in Markdown...
```

3. Save → live at `/fitness/my-post`.

---

## 4. The frontmatter block (the `---` settings)

Everything between the top `---` and the second `---` is **frontmatter** — the post's settings. It must be valid YAML.

### Writeup fields

| Field | Required | Type / allowed values | Default | Notes |
|-------|----------|-----------------------|---------|-------|
| `title` | ✅ | text | — | The headline. Wrap in quotes if it contains `:` or special chars. |
| `description` | ✅ | text | — | One line. Shown on cards + used for the page meta description. |
| `pubDate` | ✅ | date `YYYY-MM-DD` | — | Controls sort order (newest first). |
| `severity` | ✅ | `critical` \| `high` \| `medium` \| `low` \| `info` | — | Renders the colored severity badge. |
| `category` | ❌ | `web-app-security` \| `api-secuirty` \| `cloud-security` \| `ctfs` \| `blog` | `web-app-security` | Decides which category page lists it (see §5). |
| `coverImage` | ❌ | path text | — | Thumbnail on list cards. Path starts at `/media/...`. |
| `program` | ❌ | text | — | e.g. `PortSwigger Labs`, a bug bounty program. Shown as a small label. |
| `tags` | ❌ | list of text | `[]` | Shown as `#tag` chips. |
| `draft` | ❌ | `true` \| `false` | `false` | `true` hides the post everywhere (see §8). |

> ⚠️ Note: the category value `api-secuirty` is intentionally misspelled to match the existing route `/api-secuirty`. Type it exactly like that.

### Fitness fields

| Field | Required | Type | Default | Notes |
|-------|----------|------|---------|-------|
| `title` | ✅ | text | — | |
| `description` | ✅ | text | — | |
| `pubDate` | ✅ | date `YYYY-MM-DD` | — | Sort order. |
| `tags` | ❌ | list of text | `[]` | |
| `coverImage` | ❌ | path text | — | |
| `draft` | ❌ | `true`/`false` | `false` | |

### Tag formats (both work)

```yaml
tags: ['ssrf', 'web', 'cloud']
```
or
```yaml
tags:
  - ssrf
  - web
  - cloud
```

---

## 5. Where a writeup appears (categories)

A writeup **always** appears on **`/blog`** (the "Work" page), which lists everything.

It **also** appears on one category page, chosen by its `category` field:

| `category` value | Category page |
|------------------|---------------|
| `web-app-security` | `/web-app-security` |
| `api-secuirty` | `/api-secuirty` |
| `cloud-security` | `/cloud-security` |
| `ctfs` | `/ctfs` |
| `blog` | (only shows on `/blog`, no dedicated category) |

If you omit `category`, it defaults to `web-app-security`.

---

## 6. Writing the body (Markdown / MDX)

Below the second `---`, write normal Markdown. Supported:

```md
## Heading 2
### Heading 3

Normal paragraph with **bold**, *italic*, and `inline code`.

- bullet list
- second item

1. numbered list
2. second item

> blockquote

[a link](https://example.com)

​```bash
# fenced code block with syntax highlighting
curl -s https://target/api | jq .
​```

| Col A | Col B |
|-------|-------|
| cell  | cell  |
```

Headings, code blocks, tables, links, and quotes are all styled automatically by the post layout.

---

## 7. Adding images

1. Put image files anywhere under the `public/media/` folder. A good convention already used here is by date:
   `public/media/blog/chriscz/2026/07/screenshot.png`
2. Reference them in the post by dropping the `public` part — paths start at `/media/...`:

```md
![what the screenshot shows](/media/blog/chriscz/2026/07/screenshot.png)
```

3. To use an image as the **card thumbnail**, set it in frontmatter:

```yaml
coverImage: '/media/blog/chriscz/2026/07/cover.png'
```

Tips:
- Always include alt text in `![alt](...)` for accessibility.
- Supported formats: `.png`, `.jpg`, `.gif`, `.webp`, `.svg`.
- Keep large GIFs small (a few MB max) so pages stay fast.

---

## 8. Drafts (work on a post before publishing)

Set `draft: true` in frontmatter. The post will:
- **not** appear in any list (`/blog`, category pages, `/fitness`)
- **not** generate a public page in the production build

When ready to publish, change it to `draft: false`.

> While the dev server is running you can still preview a draft by visiting its URL directly, but it won't be linked anywhere.

---

## 9. Ordering & dates

- Posts are sorted by `pubDate`, **newest first**, in every list.
- Format is `YYYY-MM-DD` (e.g. `2026-07-01`). Quotes optional.
- A future date is allowed; the post still publishes immediately (it just sorts to the top). There is no scheduled/auto-publish — `draft` is how you hold a post back.

---

## 10. Preview, build, and publish

**Preview locally**
```bash
npm run dev
```
Open `http://localhost:4321`. Save a post → it updates instantly.

**Build (and catch errors)**
```bash
npm run build
```
This validates every post's frontmatter. If something is wrong, the build fails with a message pointing at the file/field.

**Publish**
The site deploys to **Cloudflare Workers**. Commit and push your new `.mdx` file (and any images); if the repo is connected to Cloudflare it rebuilds and deploys automatically:

```bash
git add src/content/ public/media/
git commit -m "Add writeup: SSRF in the image proxy"
git push
```

To deploy manually from your machine instead:

```bash
npm run deploy   # runs the build, then `wrangler deploy`
```

---

## 11. Copy-paste templates

### Full writeup template

```mdx
---
title: ''
description: ''
pubDate: 2026-01-01
severity: medium          # critical | high | medium | low | info
category: 'web-app-security'  # web-app-security | api-secuirty | cloud-security | ctfs | blog
program: ''               # optional — remove if unused
coverImage: ''            # optional — remove if unused, e.g. /media/blog/chriscz/2026/01/cover.png
tags: []
draft: true               # flip to false to publish
---

## Summary

## Steps to Reproduce

## Impact

## Remediation
```

### Full fitness template

```mdx
---
title: ''
description: ''
pubDate: 2026-01-01
tags: []
coverImage: ''            # optional — remove if unused
draft: true
---

Write your post here.
```

---

## 12. Troubleshooting

| Problem | Likely cause / fix |
|--------|--------------------|
| Build fails mentioning a field | A required field (`title`, `description`, `pubDate`, `severity`) is missing or misnamed. |
| Build fails on `severity` / `category` | Value isn't in the allowed list. Check spelling — note `api-secuirty`. |
| Date error | `pubDate` must be `YYYY-MM-DD` (not `07/01/2026`). |
| Post doesn't show up | `draft` is `true`, or the file isn't in `src/content/writeups/` or `src/content/fitness/`. |
| Title with a colon breaks YAML | Wrap the value in quotes: `title: 'XSS: stored to account takeover'`. |
| Image doesn't load | Path must start with `/media/...` (drop the `public/` prefix) and the file must exist under `public/`. |
| Wrong category page | Fix the `category` value (see §5). |
| Apostrophe in YAML text | Use double quotes: `description: "I'm testing..."`. |

---

## 13. Cheat sheet

- New writeup → file in `src/content/writeups/<slug>.mdx`
- New fitness post → file in `src/content/fitness/<slug>.mdx`
- File name = URL slug
- Required (writeup): `title`, `description`, `pubDate`, `severity`
- Required (fitness): `title`, `description`, `pubDate`
- Hide a post: `draft: true`
- Images: put in `public/media/...`, reference as `/media/...`
- Preview: `npm run dev` · Validate: `npm run build` · Publish: commit + push

---

## 14. Changing the homepage (hero video + intro text)

The homepage isn't a post — its copy lives in **`src/config/site.ts`** and its hero media in **`public/media/`**.

- **Intro text / tagline / site name:** edit `name`, `tagline`, and `description` in `src/config/site.ts`.
- **Hero video:** the homepage plays `public/media/hero.mp4`. To swap it, replace that file (keep the same name), or point `heroVideo` in `src/config/site.ts` at a different path under `public/`. Keep it small and web-friendly (a short, muted, looping MP4, a few MB max).
- **Nav links:** edit `mainNav` in `src/config/navigation.ts`. Use paths that already exist (e.g. `/blog`, `/fitness`).

---

## 15. Search (nothing to do)

Search is built automatically from your posts. Every writeup and fitness post is indexed by its `title`, `description`, tags, and category — just publish a post and it becomes searchable. There is no manual index to update.
