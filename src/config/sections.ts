/**
 * Main site sections — used by home foot selector, footer, and docs.
 * To add GIFs: drop files in public/media/gifs/ and update `gif` paths here only.
 */
import { media } from './media';

export type SiteSection = {
  id: 'writeups' | 'fitness';
  title: string;
  description: string;
  href: string;
  gif: string;
  /** Where to add MDX files (relative to repo root) */
  contentDir: string;
  /** URL pattern for posts */
  urlPattern: string;
};

export const siteSections: SiteSection[] = [
  {
    id: 'writeups',
    title: 'Writeups & Labs',
    description:
      'SQLi, IDOR, BOLA, SSRF, XSS, and CTF notes — appsec research with repro steps.',
    href: '/blog',
    gif: media.gifs.hacker1,
    contentDir: 'src/content/writeups/',
    urlPattern: '/writeups/{slug}',
  },
  {
    id: 'fitness',
    title: 'Fitness / Life',
    description: 'Gym, training, recovery, and life off the keyboard.',
    href: '/fitness',
    gif: media.gifs.hacker3,
    contentDir: 'src/content/fitness/',
    urlPattern: '/fitness/{slug}',
  },
];

export const sectionById = Object.fromEntries(siteSections.map((s) => [s.id, s])) as Record<
  SiteSection['id'],
  SiteSection
>;
