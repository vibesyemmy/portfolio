import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Velocity-driven diagonal scroll.
 *
 * Each top-level <main> section leans (skewY) in proportion to scroll
 * velocity and springs back to straight when scrolling stops — reading as
 * diagonal motion without permanently displacing content. Gated behind
 * prefers-reduced-motion. The transient horizontal overflow this produces
 * is contained by `main { overflow-x: clip }` in global.css.
 */

const MAX_ANGLE = 5; // degrees, clamp — kept small so the lean reads as a subtle
// diagonal rather than a jarring tilt, and so the skewed sections sweep a much
// smaller repaint/overflow area each frame (smoother, cheaper)
const DAMPING = 550; // higher = calmer / less reactive to velocity spikes

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  // Skip sections that opt out (e.g. the pinned horizontal testimonials, whose
  // own transform would fight the skew).
  const targets = Array.from(document.querySelectorAll<HTMLElement>('main > *')).filter(
    (el) => !el.hasAttribute('data-no-skew')
  );

  if (targets.length) {
    const proxy = { skew: 0 };
    const setSkew = gsap.quickSetter(targets, 'skewY', 'deg');

    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = gsap.utils.clamp(
          -MAX_ANGLE,
          MAX_ANGLE,
          self.getVelocity() / -DAMPING
        );
        // Only kick a new spring-back when this frame's lean exceeds the current one
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          });
        }
      },
    });
  }
}
