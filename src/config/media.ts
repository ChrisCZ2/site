/**
 * Hacker / coder imagery — photos, GIFs in /public/media/.
 */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=75`;

export const media = {
  heroPoster: u('photo-1633356122544-f134324a6cee', 1600),
  featureCard: u('photo-1555949963-aa79dcee981c', 1000),
  /** Animated terminal (regenerate: npm run gif:terminal) */
  homeTerminalGif: '/media/gifs/terminal-exploit.gif',
  /** Who section corner badge */
  chrisczRoot: '/media/gifs/chriscz-root.gif',
  gifs: {
    hacker1: '/media/gifs/hacker-1.gif',
    hacker2: '/media/gifs/hacker-2.gif',
    hacker3: '/media/gifs/hacker-3.gif',
  },
  writeupImages: [
    u('photo-1526374965328-7f61d4f18f5a', 600),
    u('photo-1563986768609-322da13575f3', 600),
    u('photo-1544197150-1bb622a48c2c', 600),
    u('photo-1504639725590-34d0984388bd', 600),
    u('photo-1550751827-4bd374c1f58b', 600),
    u('photo-1614064641938-3bbee5293c4d', 600),
  ],
} as const;

/** Section GIFs — swap files in public/media/gifs/ or change paths here */
export const sectionGifs = {
  writeups: media.gifs.hacker1,
  fitness: media.gifs.hacker3,
} as const;
