import gsap from 'gsap';
import { clampToRadius, launchVelocity, hitTest, pinTriangle, type Vec } from './bowling-physics';
import { createPinField, type PinField } from './bowling-pins-3d';

const CONF = {
  DRAG_THRESHOLD: 12, // px before a press becomes a throw
  MAX_STRETCH: 280, // px clamp on drag distance from home (room to roam over the headline)
  LAUNCH_K: 0.11, // release speed = stretch * K (px/frame); ~1.4x stretch of travel
  FRICTION: 0.92, // velocity decay per frame
  SETTLE_SPEED: 0.4, // below this the ball settles
  BALL_RADIUS: 30, // collision radius of the avatar
  PIN_RADIUS: 7,
  PIN_SPACING: 18,
  PIN_HEIGHT: 46, // px tall the 3D pins render
  RESET_DELAY: 1500, // ms after settle before respawn
  SPLASH_OFFSET_Y: 72, // px the splash floats above home
};

type State = 'idle' | 'arming' | 'firing' | 'settle';

export function initHeroBowling(avatar: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (avatar.dataset.bowlingReady) return; // bind once per element, even if re-inited
  avatar.dataset.bowlingReady = '1';

  // the headline wrapper gets a `hb-playing` class during a throw so CSS can
  // soften the text and free up drag room around the avatar
  const inner = avatar.closest<HTMLElement>('.hero-wall__inner');

  let state: State = 'idle';
  let homeCenter: Vec = { x: 0, y: 0 }; // viewport coords of avatar's rest centre
  let pointerStart: Vec = { x: 0, y: 0 };
  let ballPos: Vec = { x: 0, y: 0 }; // offset from home (the gsap x/y of the avatar)
  let vel: Vec = { x: 0, y: 0 };
  let armed = false; // crossed the drag threshold this gesture
  let raf = 0;
  let resetTimer = 0; // pending respawn timer (0 = none)
  let overlay: HTMLDivElement | null = null;
  let splashEl: HTMLDivElement | null = null;
  let pinPos: Vec[] = [];
  let pinDown: boolean[] = [];
  let pinField: PinField | null = null;
  let pinFieldLoading = false;

  const setBall = (x: number, y: number) => {
    ballPos = { x, y };
    gsap.set(avatar, { x, y });
  };

  // Lazy-load three.js + the GLB on first press, so they never weigh down the
  // initial page; cached for every later throw. The game still runs if it fails.
  const ensurePinField = () => {
    if (pinField || pinFieldLoading) return;
    pinFieldLoading = true;
    createPinField('/bowling-pin.glb', CONF.PIN_HEIGHT)
      .then((pf) => {
        pinField = pf;
      })
      .catch(() => {
        /* three.js or the GLB failed to load — fall back to a pin-less throw */
      });
  };

  const buildOverlay = () => {
    overlay = document.createElement('div');
    overlay.className = 'hb-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    pinPos = pinTriangle({ x: 0, y: 0 }, CONF.PIN_SPACING);
    pinDown = pinPos.map(() => false);

    splashEl = document.createElement('div');
    splashEl.className = 'hb-splash';
    overlay.appendChild(splashEl);

    document.body.appendChild(overlay);

    // the pins live in the shared 3D canvas, not the DOM overlay
    pinField?.place(homeCenter, pinPos);
    pinField?.spawn();
    pinField?.startRender();
  };

  const teardown = () => {
    cancelAnimationFrame(raf);
    clearTimeout(resetTimer);
    overlay?.remove();
    overlay = null;
    splashEl = null;
    pinField?.reset();
    pinField?.stopRender();
    pinPos = [];
    pinDown = [];
    avatar.removeAttribute('data-magnetic-paused');
    inner?.classList.remove('hb-playing');
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
    clearTimeout(resetTimer);
    floatHomeThenTeardown();
  };

  const scatterPin = (i: number) => {
    pinDown[i] = true;
    // hand the impact direction (screen-space) to the 3D field, which tumbles it
    pinField?.scatter(i, { x: pinPos[i].x - ballPos.x, y: pinPos[i].y - ballPos.y });
  };

  const showSplash = () => {
    if (!splashEl) return;
    const down = pinDown.filter(Boolean).length;
    splashEl.textContent = down === pinPos.length ? 'STRIKE!' : `${down}/${pinPos.length}`;
    splashEl.style.left = `${homeCenter.x}px`;
    splashEl.style.top = `${homeCenter.y - CONF.SPLASH_OFFSET_Y}px`;
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
    pinPos.forEach((_, i) => {
      if (pinDown[i]) return;
      if (hitTest(ballPos, CONF.BALL_RADIUS, pinPos[i], CONF.PIN_RADIUS)) scatterPin(i);
    });
    if (Math.hypot(vel.x, vel.y) < CONF.SETTLE_SPEED) {
      state = 'settle';
      showSplash();
      resetTimer = window.setTimeout(floatHomeThenTeardown, CONF.RESET_DELAY);
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  avatar.addEventListener('pointerdown', (e) => {
    if (state !== 'idle') return;
    ensurePinField();
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
      inner?.classList.add('hb-playing');
      gsap.killTweensOf(avatar);
      const curX = Number(gsap.getProperty(avatar, 'x')) || 0;
      const curY = Number(gsap.getProperty(avatar, 'y')) || 0;
      const r = avatar.getBoundingClientRect();
      homeCenter = { x: r.left + r.width / 2 - curX, y: r.top + r.height / 2 - curY };
      buildOverlay();
    }
    const s = clampToRadius({ x: dx, y: dy }, CONF.MAX_STRETCH);
    setBall(s.x, s.y);
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
    vel = launchVelocity({ x: 0, y: 0 }, ballPos, CONF.LAUNCH_K);
    raf = requestAnimationFrame(tick);
  });

  avatar.addEventListener('pointercancel', abort);
  window.addEventListener('scroll', abort, { passive: true });
  window.addEventListener('resize', abort, { passive: true });
}
