import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  // Single-element reveals (autoAlpha clears the CSS visibility pre-hide)
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Staggered child groups
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // Seamless marquee (content duplicated in markup)
  document.querySelectorAll<HTMLElement>('[data-marquee-track]').forEach((track) => {
    gsap.to(track, { xPercent: -50, ease: 'none', duration: 24, repeat: -1 });
  });

  // Magnetic pills
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });

  // Headline line reveals — wait for fonts so line breaks measure correctly,
  // then reveal the (CSS-prehidden) heading and slide its lines up from the mask.
  document.fonts.ready.then(() => {
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
      const split = new SplitType(el, { types: 'lines', lineClass: 'line-inner' });
      split.lines?.forEach((line) => {
        const wrap = document.createElement('div');
        wrap.className = 'line';
        line.replaceWith(wrap);
        wrap.appendChild(line);
      });
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(el.querySelectorAll('.line-inner'), {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
    ScrollTrigger.refresh();
  });
}
