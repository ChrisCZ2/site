/**
 * Topic archives — routes match chriscz.com (including api-secuirty typo).
 */
export type TopicSlug =
  | 'blog'
  | 'web-app-security'
  | 'api-secuirty'
  | 'cloud-security'
  | 'ctfs';

export type Topic = {
  slug: TopicSlug;
  href: string;
  title: string;
  description: string;
  /** Writeup category filter; blog shows all */
  category?: string;
};

export const topics: Topic[] = [
  {
    slug: 'blog',
    href: '/blog',
    title: 'Blog',
    description: 'All writeups — main place about my research as a hacker.',
  },
  {
    slug: 'web-app-security',
    href: '/web-app-security',
    title: 'Web App Pentesting',
    description:
      'Web application security writeups: injection, access control, XSS, and file upload issues.',
    category: 'web-app-security',
  },
  {
    slug: 'api-secuirty',
    href: '/api-secuirty',
    title: 'API Security',
    description:
      'API pentesting notes — BOLA, broken authorization, and data exposure through APIs.',
    category: 'api-secuirty',
  },
  {
    slug: 'cloud-security',
    href: '/cloud-security',
    title: 'Cloud Pentesting',
    description: 'Cloud and container security research, including SSRF and metadata abuse.',
    category: 'cloud-security',
  },
  {
    slug: 'ctfs',
    href: '/ctfs',
    title: 'CTFs',
    description: 'CTF challenge writeups and walkthroughs.',
    category: 'ctfs',
  },
];

export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t])) as Record<
  TopicSlug,
  Topic
>;
