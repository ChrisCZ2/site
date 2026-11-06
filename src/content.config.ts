import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { getYouTubeVideoId } from './utils/youtube';

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
    youtubeVideo: z
      .string()
      .refine((value) => getYouTubeVideoId(value) !== null, {
        message: 'Use a valid YouTube URL or 11-character video ID',
      })
      .optional(),
    program: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writeups };
