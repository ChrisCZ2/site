const YOUTUBE_VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Accept a YouTube video ID or the common watch, share, Shorts, live, and
 * embed URL formats and return the canonical video ID.
 */
export function getYouTubeVideoId(value: string): string | null {
  const candidate = value.trim();

  if (YOUTUBE_VIDEO_ID.test(candidate)) {
    return candidate;
  }

  try {
    const url = new URL(candidate);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    let videoId: string | null = null;

    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? null;
    } else if (
      hostname === 'youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'music.youtube.com'
    ) {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v');
      } else {
        const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
        videoId = match?.[1] ?? null;
      }
    }

    return videoId && YOUTUBE_VIDEO_ID.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

