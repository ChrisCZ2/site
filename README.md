# chriscz portfolio

Bug bounty portfolio & writeup blog — [Astro](https://astro.build), file-based routes, deploys to **Vercel** in one click.

**Colors:** [#ba1200 · #031927 · #9dd1f1 · #508aa8 · #c8e0f4](https://coolors.co/ba1200-031927-9dd1f1-508aa8-c8e0f4)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:4321

---

## Branding (name, title, footer)

Edit **`src/config/site.ts`** only:

```ts
export const site = {
  name: 'chriscz',           // logo letter, footer © line
  title: 'chriscz — bug bounty & appsec',  // browser tab default
  handle: 'chriscz',         // used in layouts & metadata
  url: 'https://chriscz.example',  // canonical URLs (set real domain on deploy)
  // ...
};
```

Header logo, page titles (`PageLayout`), and footer copyright all read from this file.

---

## Add a new page / route

Astro maps **`src/pages/`** files to URLs automatically.

### 1. Create the page file

| File | URL |
|------|-----|
| `src/pages/programs.astro` | `/programs` |
| `src/pages/notes/index.astro` | `/notes` |
| `src/pages/notes/[slug].astro` | `/notes/:slug` (dynamic) |

**Minimal template** — copy `src/pages/_example-new-section.astro.example` to `src/pages/your-page.astro` and edit:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
---

<PageLayout
  title="Programs"
  description="Optional subtitle under the H1."
  crumb="$ cat programs.txt"
>
  <article class="card prose-writeup">
    <p>Section content here.</p>
  </article>
</PageLayout>
```

### 2. Add to navigation

Edit **`src/config/navigation.ts`**:

```ts
export const mainNav: NavLink[] = [
  // ...
  { href: '/programs', label: 'Programs' },
];
```

Optional: add the same link under `footerColumns` so it appears in the footer.

### 3. Preview

```bash
npm run dev
```

Visit http://localhost:4321/programs

---

## Add a homepage section (same page, new block)

Edit **`src/pages/index.astro`** — copy an existing `<section>` (e.g. perks or latest writeups) and change the title/content.

For reusable data (stats, lists), add arrays to **`src/config/site.ts`** and loop in `index.astro`.

---

## Adding content safely

See **[CONTENT.md](./CONTENT.md)** for full guides per section (writeups, fitness, categories, GIFs, drafts).

Quick rule: **only add `.mdx` files** under `src/content/writeups/` or `src/content/fitness/` with valid frontmatter, then run `npm run build`.

---

## Add a writeup (blog post)

Create **`src/content/writeups/my-finding.mdx`**:

```mdx
---
title: 'Finding title'
description: 'One-line summary'
pubDate: 2026-05-16
severity: high
program: '[Program]'
tags: [api, idor]
draft: false
---

## Summary
...
```

Live at **`/writeups/my-finding`** — no nav change required (already under Writeups).

---

## Config reference

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Name, title, stats, links, tools, hall of fame |
| `src/config/navigation.ts` | Header + footer links |
| `src/config/media.ts` | GIFs, images |
| `src/config/sections.ts` | Home/footer section cards + GIFs |
| `src/content/fitness/` | MDX fitness/life posts |
| `CONTENT.md` | How to add content per section |
| `src/config/theme.ts` | Color palette |
| `src/content/writeups/` | MDX writeups |

---

## Deploy (Vercel)

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import repo.
3. Set env: `PUBLIC_SITE_URL=https://yourdomain.com`
4. Update `site.url` in `site.ts` and `public/.well-known/security.txt`.

Build: `npm run build` → output `dist/`
