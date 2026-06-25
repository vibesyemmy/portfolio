# Hero Avatar Bowling Easter Egg — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden slingshot-bowling mini-game to the home hero avatar — drag the avatar away, 6 pins appear at its home spot, release to fling it back through them.

**Architecture:** Pure geometry helpers (`bowling-physics.ts`, unit-tested with vitest) drive a self-contained DOM game module (`bowling.ts`, a small `idle → arming → firing → settle` state machine). The avatar element is the ball, moved through GSAP's transform channel (the same one the magnetic effect uses) so the two never conflict; magnetic is paused via a `data-magnetic-paused` attribute during play. A script-built, `aria-hidden`, `pointer-events:none` overlay renders the pins, the slingshot band, and the splash. Gated off under `prefers-reduced-motion`.

**Tech Stack:** TypeScript, GSAP (already bundled), Astro client `<script>`, vitest (new dev dependency).

---

## File structure

| File | Responsibility |
|---|---|
| `src/scripts/bowling-physics.ts` (create) | Pure, DOM-free geometry: clamp, launch velocity, hit test, pin layout |
| `src/scripts/bowling-physics.test.ts` (create) | Vitest unit tests for the pure helpers |
| `src/scripts/bowling.ts` (create) | The game: state machine, pointer drag, physics loop, overlay, scatter, reset |
| `src/styles/global.css` (modify) | Global classes for the overlay, pins, band, splash |
| `src/scripts/animations.ts` (modify) | Magnetic handlers early-return while `data-magnetic-paused` is set |
| `src/components/sections/HeroWall.astro` (modify) | Client `<script>` that calls `initHeroBowling` on the avatar |
| `vitest.config.ts` (create) | Minimal vitest config (node env, `src/**/*.test.ts`) |
| `package.json` (modify) | Add `vitest` devDep + `test` script |

---

### Task 1: Vitest harness

**Files:**
- Modify: `package.json` (scripts)
- Create: `vitest.config.ts`

- [ ] **Step 1: Install vitest**

Run: `npm install -D vitest`
Expected: vitest added to devDependencies.

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Create the vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Smoke-test the harness**

Create `src/scripts/_smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('vitest harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 5: Remove the smoke test and commit**

Run: `rm src/scripts/_smoke.test.ts`

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest harness for unit tests"
```

---

### Task 2: Pure helpers — clampToRadius + launchVelocity

**Files:**
- Create: `src/scripts/bowling-physics.ts`
- Test: `src/scripts/bowling-physics.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/scripts/bowling-physics.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { clampToRadius, launchVelocity } from './bowling-physics';

describe('clampToRadius', () => {
  it('leaves a short vector unchanged', () => {
    expect(clampToRadius({ x: 3, y: 4 }, 10)).toEqual({ x: 3, y: 4 });
  });
  it('clamps a long vector to max magnitude, preserving direction', () => {
    const r = clampToRadius({ x: 30, y: 40 }, 10); // mag 50 → scale 0.2
    expect(r.x).toBeCloseTo(6);
    expect(r.y).toBeCloseTo(8);
    expect(Math.hypot(r.x, r.y)).toBeCloseTo(10);
  });
  it('handles the zero vector', () => {
    expect(clampToRadius({ x: 0, y: 0 }, 10)).toEqual({ x: 0, y: 0 });
  });
});

describe('launchVelocity', () => {
  it('points from release back toward home, scaled by k', () => {
    expect(launchVelocity({ x: 0, y: 0 }, { x: 100, y: -50 }, 0.5)).toEqual({ x: -50, y: 25 });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL ("Failed to resolve import './bowling-physics'").

- [ ] **Step 3: Implement the helpers**

Create `src/scripts/bowling-physics.ts`:

```ts
// Pure geometry helpers for the hero bowling easter egg. No DOM, no side effects.

export type Vec = { x: number; y: number };

/** Clamp a vector's magnitude to `max` (direction preserved). */
export function clampToRadius(v: Vec, max: number): Vec {
  const mag = Math.hypot(v.x, v.y);
  if (mag <= max || mag === 0) return { x: v.x, y: v.y };
  const s = max / mag;
  return { x: v.x * s, y: v.y * s };
}

/** Slingshot launch velocity: flings from `release` back toward `home`. */
export function launchVelocity(home: Vec, release: Vec, k: number): Vec {
  return { x: (home.x - release.x) * k, y: (home.y - release.y) * k };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/scripts/bowling-physics.ts src/scripts/bowling-physics.test.ts
git commit -m "feat: add clampToRadius and launchVelocity helpers"
```

---

### Task 3: Pure helper — hitTest

**Files:**
- Modify: `src/scripts/bowling-physics.ts`
- Test: `src/scripts/bowling-physics.test.ts`

- [ ] **Step 1: Add the failing tests**

Append to `src/scripts/bowling-physics.test.ts` (add `hitTest` to the existing import line):

```ts
import { clampToRadius, launchVelocity, hitTest } from './bowling-physics';

describe('hitTest', () => {
  it('is true when circles overlap', () => {
    expect(hitTest({ x: 0, y: 0 }, 10, { x: 12, y: 0 }, 5)).toBe(true); // dist 12 <= 15
  });
  it('is false when circles are apart', () => {
    expect(hitTest({ x: 0, y: 0 }, 10, { x: 30, y: 0 }, 5)).toBe(false); // dist 30 > 15
  });
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npm test`
Expected: FAIL ("hitTest is not a function").

- [ ] **Step 3: Implement hitTest**

Append to `src/scripts/bowling-physics.ts`:

```ts
/** Circle/circle overlap test between the ball and a pin. */
export function hitTest(ball: Vec, ballR: number, pin: Vec, pinR: number): boolean {
  return Math.hypot(ball.x - pin.x, ball.y - pin.y) <= ballR + pinR;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/scripts/bowling-physics.ts src/scripts/bowling-physics.test.ts
git commit -m "feat: add hitTest collision helper"
```

---

### Task 4: Pure helper — pinTriangle

**Files:**
- Modify: `src/scripts/bowling-physics.ts`
- Test: `src/scripts/bowling-physics.test.ts`

- [ ] **Step 1: Add the failing tests**

Append to `src/scripts/bowling-physics.test.ts` (add `pinTriangle` to the import line):

```ts
import { clampToRadius, launchVelocity, hitTest, pinTriangle } from './bowling-physics';

describe('pinTriangle', () => {
  it('returns six pins', () => {
    expect(pinTriangle({ x: 0, y: 0 }, 18)).toHaveLength(6);
  });
  it('is horizontally symmetric about the centre', () => {
    const sumX = pinTriangle({ x: 0, y: 0 }, 18).reduce((s, p) => s + p.x, 0);
    expect(sumX).toBeCloseTo(0);
  });
  it('stacks three distinct rows by y', () => {
    const ys = [...new Set(pinTriangle({ x: 0, y: 0 }, 18).map((p) => p.y))];
    expect(ys).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npm test`
Expected: FAIL ("pinTriangle is not a function").

- [ ] **Step 3: Implement pinTriangle**

Append to `src/scripts/bowling-physics.ts`:

```ts
/** Six pin centres in a 3-2-1 triangle (apex up), centred on `center`. */
export function pinTriangle(center: Vec, spacing: number): Vec[] {
  const rows = [1, 2, 3]; // pins per row, top → bottom
  const out: Vec[] = [];
  rows.forEach((count, r) => {
    const y = center.y + (r - 1) * spacing; // middle row at center.y
    const rowWidth = (count - 1) * spacing;
    for (let i = 0; i < count; i++) {
      out.push({ x: center.x - rowWidth / 2 + i * spacing, y });
    }
  });
  return out;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add src/scripts/bowling-physics.ts src/scripts/bowling-physics.test.ts
git commit -m "feat: add pinTriangle layout helper"
```

---

### Task 5: Game module (bowling.ts)

**Files:**
- Create: `src/scripts/bowling.ts`

- [ ] **Step 1: Create the full game module**

Create `src/scripts/bowling.ts`:

```ts
import gsap from 'gsap';
import { clampToRadius, launchVelocity, hitTest, pinTriangle, type Vec } from './bowling-physics';

const CONF = {
  DRAG_THRESHOLD: 12, // px before a press becomes a throw
  MAX_STRETCH: 120, // px clamp on drag distance from home
  LAUNCH_K: 0.35, // release speed = stretch * K (px/frame)
  FRICTION: 0.92, // velocity decay per frame
  SETTLE_SPEED: 0.4, // below this the ball settles
  BALL_RADIUS: 30, // collision radius of the avatar
  PIN_RADIUS: 7,
  PIN_SPACING: 18,
  RESET_DELAY: 1500, // ms after settle before respawn
};

type State = 'idle' | 'arming' | 'firing' | 'settle';

export function initHeroBowling(avatar: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let state: State = 'idle';
  let homeCenter: Vec = { x: 0, y: 0 }; // viewport coords of avatar's rest centre
  let pointerStart: Vec = { x: 0, y: 0 };
  let ballPos: Vec = { x: 0, y: 0 }; // offset from home (the gsap x/y of the avatar)
  let vel: Vec = { x: 0, y: 0 };
  let armed = false; // crossed the drag threshold this gesture
  let raf = 0;
  let overlay: HTMLDivElement | null = null;
  let band: SVGLineElement | null = null;
  let splashEl: HTMLDivElement | null = null;
  let pinEls: HTMLDivElement[] = [];
  let pinPos: Vec[] = [];
  let pinDown: boolean[] = [];

  const setBall = (x: number, y: number) => {
    ballPos = { x, y };
    gsap.set(avatar, { x, y });
  };

  const buildOverlay = () => {
    overlay = document.createElement('div');
    overlay.className = 'hb-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hb-band-svg');
    band = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    band.setAttribute('class', 'hb-band');
    svg.appendChild(band);
    overlay.appendChild(svg);

    pinPos = pinTriangle({ x: 0, y: 0 }, CONF.PIN_SPACING);
    pinDown = pinPos.map(() => false);
    pinEls = pinPos.map((p) => {
      const el = document.createElement('div');
      el.className = 'hb-pin';
      el.style.left = `${homeCenter.x + p.x}px`;
      el.style.top = `${homeCenter.y + p.y}px`;
      overlay!.appendChild(el);
      return el;
    });

    splashEl = document.createElement('div');
    splashEl.className = 'hb-splash';
    overlay.appendChild(splashEl);

    document.body.appendChild(overlay);
    gsap.fromTo(
      pinEls,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, stagger: 0.03, ease: 'back.out(2)' }
    );
  };

  const updateBand = (visible: boolean) => {
    if (!band) return;
    band.style.opacity = visible ? '1' : '0';
    band.setAttribute('x1', `${homeCenter.x}`);
    band.setAttribute('y1', `${homeCenter.y}`);
    band.setAttribute('x2', `${homeCenter.x + ballPos.x}`);
    band.setAttribute('y2', `${homeCenter.y + ballPos.y}`);
  };

  const teardown = () => {
    cancelAnimationFrame(raf);
    overlay?.remove();
    overlay = null;
    band = null;
    splashEl = null;
    pinEls = [];
    pinPos = [];
    pinDown = [];
    avatar.removeAttribute('data-magnetic-paused');
    state = 'idle';
    armed = false;
  };

  const floatHomeThenTeardown = () => {
    gsap.to(avatar, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        ballPos = { x: 0, y: 0 };
        teardown();
      },
    });
  };

  const abort = () => {
    if (state === 'idle') return;
    cancelAnimationFrame(raf);
    floatHomeThenTeardown();
  };

  const scatterPin = (i: number) => {
    pinDown[i] = true;
    const ang = Math.atan2(pinPos[i].y - ballPos.y, pinPos[i].x - ballPos.x);
    const dist = 50 + Math.random() * 45;
    gsap.to(pinEls[i], {
      x: Math.cos(ang) * dist,
      y: Math.sin(ang) * dist,
      rotation: (Math.random() - 0.5) * 540,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const showSplash = () => {
    if (!splashEl) return;
    const down = pinDown.filter(Boolean).length;
    splashEl.textContent = down === pinEls.length ? 'STRIKE!' : `${down}/${pinEls.length}`;
    splashEl.style.left = `${homeCenter.x}px`;
    splashEl.style.top = `${homeCenter.y - 72}px`;
    gsap.fromTo(
      splashEl,
      { scale: 0.6, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: 'back.out(3)' }
    );
    gsap.to(splashEl, { opacity: 0, duration: 0.4, delay: 0.9 });
  };

  const tick = () => {
    setBall(ballPos.x + vel.x, ballPos.y + vel.y);
    vel = { x: vel.x * CONF.FRICTION, y: vel.y * CONF.FRICTION };
    updateBand(false);
    pinEls.forEach((_, i) => {
      if (pinDown[i]) return;
      if (hitTest(ballPos, CONF.BALL_RADIUS, pinPos[i], CONF.PIN_RADIUS)) scatterPin(i);
    });
    if (Math.hypot(vel.x, vel.y) < CONF.SETTLE_SPEED) {
      state = 'settle';
      showSplash();
      window.setTimeout(floatHomeThenTeardown, CONF.RESET_DELAY);
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  avatar.addEventListener('pointerdown', (e) => {
    if (state !== 'idle') return;
    pointerStart = { x: e.clientX, y: e.clientY };
    state = 'arming';
    armed = false;
    try {
      avatar.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic events have no real pointer; ignore */
    }
  });

  avatar.addEventListener('pointermove', (e) => {
    if (state !== 'arming') return;
    const dx = e.clientX - pointerStart.x;
    const dy = e.clientY - pointerStart.y;
    if (!armed) {
      if (Math.hypot(dx, dy) < CONF.DRAG_THRESHOLD) return;
      armed = true;
      avatar.setAttribute('data-magnetic-paused', '1');
      gsap.killTweensOf(avatar);
      const curX = Number(gsap.getProperty(avatar, 'x')) || 0;
      const curY = Number(gsap.getProperty(avatar, 'y')) || 0;
      const r = avatar.getBoundingClientRect();
      homeCenter = { x: r.left + r.width / 2 - curX, y: r.top + r.height / 2 - curY };
      buildOverlay();
    }
    const s = clampToRadius({ x: dx, y: dy }, CONF.MAX_STRETCH);
    setBall(s.x, s.y);
    updateBand(true);
  });

  avatar.addEventListener('pointerup', (e) => {
    if (state !== 'arming') return;
    try {
      avatar.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (!armed) {
      state = 'idle'; // a click, not a throw
      return;
    }
    state = 'firing';
    updateBand(false);
    vel = launchVelocity({ x: 0, y: 0 }, ballPos, CONF.LAUNCH_K);
    raf = requestAnimationFrame(tick);
  });

  avatar.addEventListener('pointercancel', abort);
  window.addEventListener('scroll', abort, { passive: true });
  window.addEventListener('resize', abort);
}
```

- [ ] **Step 2: Type-check**

Run: `cd /Users/opeyemiajagbe/Documents/Projects/opeyemi-app/portfolio && npx astro check 2>&1 | tail -5`
Expected: no errors referencing `bowling.ts` (pre-existing warnings elsewhere are fine).

- [ ] **Step 3: Commit**

```bash
git add src/scripts/bowling.ts
git commit -m "feat: add hero bowling game module"
```

---

### Task 6: Overlay styles

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append the overlay CSS**

Append to `src/styles/global.css`:

```css
/* Hero avatar bowling easter egg — script-built overlay (see scripts/bowling.ts) */
.hb-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}
.hb-band-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-band {
  stroke: var(--ink);
  stroke-width: 2;
  stroke-dasharray: 4 4;
  opacity: 0;
}
.hb-pin {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px; /* centre on the left/top coordinate */
  border-radius: 4px;
  background: var(--ink);
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  will-change: transform;
}
.hb-splash {
  position: absolute;
  transform: translate(-50%, -50%);
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  color: var(--accent-text);
  opacity: 0;
  white-space: nowrap;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add bowling overlay styles"
```

---

### Task 7: Pause magnetic during play + wire init

**Files:**
- Modify: `src/scripts/animations.ts` (the magnetic block, ~lines 39-59)
- Modify: `src/components/sections/HeroWall.astro`

- [ ] **Step 1: Guard the magnetic handlers**

In `src/scripts/animations.ts`, in the `[data-magnetic]` loop, add an early-return to both handlers. Replace:

```ts
    el.addEventListener('mouseenter', () => {
      const r = el.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    });
    el.addEventListener('mousemove', (e) => {
      xTo((e.clientX - cx) * 0.3);
      yTo((e.clientY - cy) * 0.3);
    });
```

with:

```ts
    el.addEventListener('mouseenter', () => {
      if (el.dataset.magneticPaused) return; // bowling game owns the transform
      const r = el.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    });
    el.addEventListener('mousemove', (e) => {
      if (el.dataset.magneticPaused) return;
      xTo((e.clientX - cx) * 0.3);
      yTo((e.clientY - cy) * 0.3);
    });
```

- [ ] **Step 2: Wire the game into the hero**

In `src/components/sections/HeroWall.astro`, add a new client `<script>` block (after the existing markup, alongside any existing `<script>`):

```astro
<script>
  import { initHeroBowling } from '../../scripts/bowling';
  const avatar = document.querySelector<HTMLElement>('.hero-wall__avatar');
  if (avatar) initHeroBowling(avatar);
</script>
```

- [ ] **Step 3: Build**

Run: `cd /Users/opeyemiajagbe/Documents/Projects/opeyemi-app/portfolio && npm run build 2>&1 | tail -2`
Expected: "Complete!" with 17 pages.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/animations.ts src/components/sections/HeroWall.astro
git commit -m "feat: pause magnetic during bowling and init game in hero"
```

---

### Task 8: In-browser verification + final pass

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `cd /Users/opeyemiajagbe/Documents/Projects/opeyemi-app/portfolio && npm run dev` (background) and open `http://localhost:4321/`.

- [ ] **Step 2: Simulate an arm + fire and assert state**

In the browser console (or via the Chrome MCP `javascript_tool`), run:

```js
(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const av = document.querySelector('.hero-wall__avatar');
  const r = av.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const pd = (t, x, y) => av.dispatchEvent(new PointerEvent(t, { pointerId: 1, bubbles: true, clientX: x, clientY: y }));
  pd('pointerdown', cx, cy);
  pd('pointermove', cx + 60, cy + 30); // cross threshold → arm
  await wait(150);
  const armed = { pins: document.querySelectorAll('.hb-pin').length, paused: av.hasAttribute('data-magnetic-paused') };
  pd('pointerup', cx + 60, cy + 30); // fire
  await wait(900);
  const mid = { anyPinDown: document.querySelectorAll('.hb-pin').length };
  await wait(2600); // settle + reset
  const after = { overlay: !!document.querySelector('.hb-overlay'), paused: av.hasAttribute('data-magnetic-paused') };
  return JSON.stringify({ armed, mid, after });
})();
```

Expected: `armed.pins === 6`, `armed.paused === true`; after reset `after.overlay === false` and `after.paused === false` (magnetic restored).

- [ ] **Step 3: Visual check**

Screenshot during the drag (pins + dashed band visible) and during the fire (pins scattering, "STRIKE!"/"n/6" splash). Confirm the ball returns home and the hero looks normal afterward.

- [ ] **Step 4: Confirm hover is unaffected**

With no drag, hover the avatar and confirm it still does the magnetic pull (and snaps back) — the game must not trigger on a plain hover or click.

- [ ] **Step 5: Reduced-motion check**

In DevTools, emulate `prefers-reduced-motion: reduce`, reload, and confirm dragging the avatar does nothing (game disabled), avatar still present.

- [ ] **Step 6: Final commit (if any tuning changed)**

If parameters in `CONF` were tuned during verification:

```bash
git add src/scripts/bowling.ts
git commit -m "tune: bowling feel (stretch/friction/launch)"
```

---

## Self-Review

**Spec coverage:**
- Arm/aim/fire/scatter/reset loop → Tasks 5, 7, 8. ✓
- 6-pin 3-2-1 triangle → Task 4 (`pinTriangle`). ✓
- Slingshot-home velocity → Task 2 (`launchVelocity`), used in Task 5. ✓
- STRIKE/n-of-6 splash → Task 5 (`showSplash`). ✓
- Auto-reset, endless → Task 5 (`floatHomeThenTeardown` + replayable listeners). ✓
- Magnetic coexistence (`data-magnetic-paused`) → Tasks 5 (set) + 7 (guard). ✓
- Overlay `aria-hidden` / `pointer-events:none` → Tasks 5 + 6. ✓
- Edge cases (click-not-drag, scroll/resize abort, pointer capture, clamp) → Task 5. ✓
- Reduced-motion gating → Task 5 (early return) + Task 8 (verify). ✓
- Verification (pure unit + in-browser + screenshots) → Tasks 2-4 + 8. ✓

**Type consistency:** `Vec`, `clampToRadius`, `launchVelocity`, `hitTest`, `pinTriangle` defined in Task 2-4 and imported with identical names/signatures in Task 5. `data-magnetic-paused` attribute name identical in Task 5 (set) and Task 7 (read). ✓

**Placeholder scan:** no TBD/TODO; all code blocks complete. ✓
