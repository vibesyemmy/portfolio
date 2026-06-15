import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const NAV_OFFSET = -96; // px — stop short of the target so the fixed nav clears it
  const onHome = () => location.pathname === '/';

  const scrollToHash = (hash: string, immediate = false) => {
    const target = document.querySelector(hash);
    if (target) lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, immediate });
  };

  // In-page anchors — handles both "#x" and "/#x". The "/#x" form lets the global
  // nav work from any page: if the target is on the current page, glide to it;
  // otherwise let the browser navigate to the homepage + hash (handled on load).
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const hash = href.startsWith('/') ? href.slice(1) : href; // "/#work" -> "#work"
      if (hash === '#' || !hash.startsWith('#')) return;
      // a "/#x" link only resolves on this page when we're already on the homepage
      if (href.startsWith('/#') && !onHome()) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
    });
  });

  // Scroll-to-top links (the logo): glide to top on the homepage; on other pages
  // let it navigate home normally.
  document.querySelectorAll<HTMLElement>('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!onHome()) return;
      e.preventDefault();
      lenis.scrollTo(0);
    });
  });

  // Arriving with a hash (e.g. a nav link clicked from a case study → /#contact):
  // position at the section once the layout has settled.
  if (location.hash.length > 1) {
    const hash = location.hash;
    requestAnimationFrame(() => setTimeout(() => scrollToHash(hash, true), 60));
  }
}
