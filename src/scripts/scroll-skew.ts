import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PROTOTYPE — Option A: velocity-driven diagonal ("skew") scroll.
 *
 * Each top-level section leans (skewY) in proportion to scroll velocity and
 * snaps back to straight when scrolling stops. Reads as diagonal motion
 * without permanently displacing content.
 *
 * Reversible: delete this file and remove its import from
 * src/layouts/Layout.astro to remove the effect entirely.
 *
 * Ships with a live tuning panel (bottom-right) for dialing in the feel —
 * the panel and the whole effect are gated behind prefers-reduced-motion.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('main > *'));

  const config = {
    enabled: true,
    maxAngle: 6, // clamp, degrees
    damping: 320, // higher = calmer / less reactive to velocity
  };

  const proxy = { skew: 0 };
  const setSkew = gsap.quickSetter(targets, 'skewY', 'deg');
  const apply = (): void => setSkew(config.enabled ? proxy.skew : 0);

  ScrollTrigger.create({
    onUpdate: (self) => {
      if (!config.enabled) return;
      const raw = self.getVelocity() / -config.damping;
      const skew = gsap.utils.clamp(-config.maxAngle, config.maxAngle, raw);
      // Only kick a new spring-back when this frame's lean exceeds the current one
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: apply,
        });
      }
    },
  });

  // --- live tuning panel ---------------------------------------------------
  const panel = document.createElement('div');
  panel.setAttribute('data-skew-panel', '');
  Object.assign(panel.style, {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    zIndex: '9999',
    background: 'rgba(10, 10, 10, 0.85)',
    color: '#fff',
    font: '12px/1.45 ui-monospace, monospace',
    padding: '12px 14px',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'grid',
    gap: '9px',
    width: '210px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
  });
  panel.innerHTML = `
    <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer">
      <span>Diagonal scroll</span>
      <input type="checkbox" data-k="enabled" checked />
    </label>
    <label style="display:grid;gap:5px">
      <span>Max angle &middot; <b data-v="maxAngle">6</b>&deg;</span>
      <input type="range" min="0" max="15" step="0.5" value="6" data-k="maxAngle" style="width:100%" />
    </label>
    <label style="display:grid;gap:5px">
      <span>Damping &middot; <b data-v="damping">320</b></span>
      <input type="range" min="120" max="600" step="20" value="320" data-k="damping" style="width:100%" />
    </label>
    <small style="opacity:.55">prototype — scroll fast to feel it</small>
  `;
  document.body.appendChild(panel);

  panel.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    const k = t.dataset.k;
    if (!k) return;
    if (t.type === 'checkbox') {
      config.enabled = t.checked;
      apply();
    } else if (k === 'maxAngle' || k === 'damping') {
      config[k] = parseFloat(t.value);
      const label = panel.querySelector(`[data-v="${k}"]`);
      if (label) label.textContent = t.value;
    }
  });
}
