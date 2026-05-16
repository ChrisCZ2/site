/** Scroll-reveal + terminal typing (gr3p-style motion, no React). */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  const termCmd = document.querySelector<HTMLElement>('[data-term-cmd]');
  if (termCmd) {
    const lines = [
      './blog --latest --writeups',
      './writeups/idor --category web-app-security',
      './api-secuirty --bola --broken-auth',
      'sqlmap -u target --batch --risk=1',
    ];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % lines.length;
      termCmd.textContent = ` ${lines[i]}`;
    }, 3200);
  }
}
