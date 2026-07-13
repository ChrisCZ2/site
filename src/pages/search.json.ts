import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Static search index — Astro port of Basically Basic's `lunr.store.js`.
 * Emits an array of { title, excerpt, categories, tags, url } documents
 * built from all content collections. Consumed client-side by Lunr.
 */

function toExcerpt(body: string | undefined, words = 50): string {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/<[^>]+>/g, ' ') // html tags
    .replace(/[#>*_~`|-]/g, ' ') // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(' ').slice(0, words).join(' ');
}

export const GET: APIRoute = async () => {
  const [writeups, fitness] = await Promise.all([
    getCollection('writeups'),
    getCollection('fitness'),
  ]);

  const store: Array<{
    title: string;
    excerpt: string;
    categories: string[];
    tags: string[];
    url: string;
  }> = [];

  for (const entry of writeups.filter((w) => !w.data.draft)) {
    store.push({
      title: entry.data.title,
      excerpt: entry.data.description
        ? `${entry.data.description} ${toExcerpt(entry.body)}`
        : toExcerpt(entry.body),
      categories: entry.data.category ? [entry.data.category] : [],
      tags: entry.data.tags ?? [],
      url: `/writeups/${entry.id}`,
    });
  }

  for (const entry of fitness.filter((f) => !f.data.draft)) {
    store.push({
      title: entry.data.title,
      excerpt: entry.data.description
        ? `${entry.data.description} ${toExcerpt(entry.body)}`
        : toExcerpt(entry.body),
      categories: ['fitness'],
      tags: entry.data.tags ?? [],
      url: `/fitness/${entry.id}`,
    });
  }

  return new Response(JSON.stringify(store), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const prerender = true;
