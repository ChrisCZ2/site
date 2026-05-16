import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writeups = defineCollection({
  loader: glob({ base: './src/content/writeups', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    severity: z.enum(['critical', 'high', 'medium', 'low', 'info']),
    category: z
      .enum(['web-app-security', 'api-secuirty', 'cloud-security', 'ctfs', 'blog'])
      .default('web-app-security'),
    coverImage: z.string().optional(),
    program: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const fitness = defineCollection({
  loader: glob({ base: './src/content/fitness', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writeups, fitness };
