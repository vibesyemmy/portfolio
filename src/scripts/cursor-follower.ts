import gsap from 'gsap';

/**
 * Attach a cursor-following label pill over one or more trigger elements.
 * The native cursor is hidden while over a trigger and the pill springs to
 * follow the pointer (used on the project wall and the blog cards so the effect
 * stays identical in both places). Gated to fine-pointer, non-reduced-motion.
 *
 * @param triggers elements that reveal the pill on hover (share one pill)
 * @param label    text shown in the pill, e.g. "View Project" / "Read Story"
 */
export function attachCursorFollower(triggers: HTMLElement[], label: string): void {
  if (!triggers.length) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  const pill = document.createElement('div');
  pill.textContent = label;
  Object.assign(pill.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '300',
    padding: '0.55rem 1.1rem',
    borderRadius: '999px',
    background: '#fff',
    color: '#0a0a0a',
    fontFamily: 'var(--font-sans)',
    fontWeight: '600',
    fontSize: '0.8rem',
    lineHeight: '1',
    letterSpacing: '0.01em',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    willChange: 'transform',
  });
  document.body.appendChild(pill);

  gsap.set(pill, { xPercent: -50, yPercent: -50, scale: 0.7, autoAlpha: 0 });
  const xTo = gsap.quickTo(pill, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(pill, 'y', { duration: 0.45, ease: 'power3' });

  triggers.forEach((el) => {
    el.style.cursor = 'none';
    el.addEventListener('pointerenter', (e) => {
      gsap.set(pill, { x: e.clientX, y: e.clientY });
      gsap.to(pill, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3' });
    });
    el.addEventListener('pointermove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(pill, { autoAlpha: 0, scale: 0.7, duration: 0.25, ease: 'power3' });
    });
  });
}
