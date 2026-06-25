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
