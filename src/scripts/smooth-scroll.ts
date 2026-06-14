import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchor links through Lenis so jumps glide with the same
  // smoothing as the rest of the page. This replaces CSS `scroll-behavior:
  // smooth`, which fought Lenis for the scroll position and caused stutter.
  const NAV_OFFSET = -96; // px — stop short of the target so the fixed nav clears it
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
    });
  });
}
