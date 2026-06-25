# Hero Avatar Bowling — Easter Egg Design

**Date:** 2026-06-25
**Component:** Home hero (`HeroWall.astro`) avatar
**Status:** Approved (design) — pending implementation plan

## Summary

A hidden mini-game on the home hero avatar. The avatar already pulls toward the
cursor (magnetic) and wears a spinning gradient ring. This adds a discoverable
slingshot-bowling game: **press and drag the avatar away, and 6 pins appear where
it normally sits; release and the avatar flings back through the pins, scattering
them.** Endless, playful, self-contained.

## Goals

- A delightful, discoverable easter egg that rewards curiosity ("what happens if
  I grab this?").
- Reuse the existing motion language (magnetic pull, GSAP) — no new dependencies.
- Stay lean: the site's pitch is a fast, lightweight build.
- Never degrade the normal hero: a plain hover (no drag) behaves exactly as today.

## Non-goals

- Not a full bowling sim — no realistic rigid-body physics engine.
- No persistent score across sessions, no leaderboard, no audio (v1).
- No keyboard play path (non-essential easter egg; pins are `aria-hidden`).

## User-facing behavior (the loop)

1. **Arm** — user presses the avatar and drags past a ~12px threshold. The
   magnetic effect suspends; 6 pins (3-2-1 triangle) fade in centered on the
   avatar's home position; an elastic band draws from home to the avatar.
2. **Aim** — dragging stretches the band; the avatar follows the pointer, clamped
   to a max stretch radius so it never flies into the project wall.
3. **Fire** — on release, the avatar launches back toward home with velocity
   proportional to the stretch distance, plowing through the pins.
4. **Scatter** — pins within collision distance tumble (translate out + rotate +
   fade). A "STRIKE!" (all 6) or "n/6" splash pops near the avatar and fades.
5. **Reset** — ~1.5s later the pins respawn (fade in), the avatar floats home, and
   the magnetic effect is restored. Back to idle; replayable indefinitely.
6. **Exit** — scrolling, clicking away, or a press that never crosses the drag
   threshold cleanly disarms: overlay removed, magnetic restored, hero normal.

## Mechanics & tunable parameters

All tunable; starting values:

| Parameter | Start value | Purpose |
|---|---|---|
| `DRAG_THRESHOLD` | 12 px | distance before a press becomes a throw (vs. a click) |
| `MAX_STRETCH` | 120 px | clamp the drag radius from home |
| `LAUNCH_K` | ~0.35 | release speed = stretch × LAUNCH_K (px/frame) |
| `FRICTION` | 0.92 / frame | velocity decay so the ball settles |
| `SETTLE_SPEED` | 0.4 px/frame | below this → stop, show splash |
| Pin layout | 3-2-1 triangle, ~16px spacing, ~6px radius | centered on home |
| `BALL_RADIUS` | ~30 px (avatar half) | collision radius |
| Scatter | 0.6s tween: fly along impact vector + rotate + fade | per hit pin |
| Splash | 1.2s fade in/out | "STRIKE!" or "n/6" |
| Reset delay | 1.5s after settle | respawn pins, float ball home |

## Architecture

- **`src/scripts/bowling.ts`** — new isolated module. Exports `initHeroBowling(avatarEl)`.
  HeroWall's existing client `<script>` calls it (after, or instead of, simply
  relying on the global magnetic binding). Keeps `HeroWall.astro` lean.
- **State machine:** `idle → arming → firing → settle → reset → idle`. A single
  state variable guards transitions (no double-throws, clean aborts).
- **Ball = the avatar element.** Moved via GSAP `x`/`y` (same transform channel as
  magnetic), so the two never write conflicting transforms — the game owns the
  transform while playing, magnetic owns it otherwise. The inner ring keeps
  spinning (its rotation is on a separate child element).
- **Overlay:** a script-built `<div>` appended near the avatar, `aria-hidden`,
  `pointer-events: none`, absolutely positioned and centered on the avatar's home
  center. Holds: 6 pin elements, the slingshot band (an inline SVG `<line>` or a
  transformed `<div>`), and the splash text. Rebuilt per game, removed on exit.
- **Pure helper:** `hitTest(ball, pin) → boolean` (circle-distance test) kept pure
  so it can be unit-tested in isolation.
- **Magnetic coexistence:** on `pointerdown`, kill any in-flight magnetic tween on
  the avatar and set a `playing` flag the magnetic `mousemove` handler checks
  (early-return while playing). On reset, clear the flag. The magnetic system in
  `animations.ts` gets a minimal guard hook for this (a shared flag or a
  `data-` attribute the handler reads).

## Data flow

```
pointerdown (avatar)
  └─ reduced-motion? → ignore (no game)
  └─ record home center; capture pointer; state = arming (not yet a throw)
pointermove
  └─ if moved < THRESHOLD → still a potential click; do nothing visible
  └─ first cross of THRESHOLD → suspend magnetic, build overlay (pins + band)
  └─ gsap.set(ball, {x, y}) to pointer (clamped to MAX_STRETCH); update band
pointerup
  └─ if never crossed THRESHOLD → cancel: remove overlay, restore magnetic, idle
  └─ else → state = firing; v = (home − release) × LAUNCH_K
       rAF loop:
         pos += v; v *= FRICTION; gsap.set(ball, {x, y}); fade/shorten band
         for each standing pin: if hitTest → scatter it (GSAP)
         if |v| < SETTLE_SPEED → state = settle
  settle
  └─ show splash (STRIKE / n-of-6); after RESET_DELAY → reset
  reset
  └─ respawn pins (fade in), float ball home (GSAP), restore magnetic, state = idle
```

## Edge cases & cleanup

- **Press without drag** (a click): never crosses threshold → no game, magnetic intact.
- **Scroll / click elsewhere / blur mid-game:** abort handler removes overlay,
  cancels rAF, restores magnetic, returns ball home.
- **Resize:** recompute home center and clamp; simplest is to abort an in-progress
  game on resize and reset to idle.
- **Pointer capture:** `setPointerCapture` so dragging continues outside the avatar
  rect.
- **Double-throw / rapid input:** state machine ignores `pointerdown` unless `idle`.
- **Clamp:** ball position clamped to `MAX_STRETCH` from home so it can't be flung
  into the project wall grid below.

## Accessibility & gating

- `prefers-reduced-motion: reduce` → `initHeroBowling` returns early; game disabled
  entirely. The avatar remains a normal magnetic element.
- Pins, band, and splash are `aria-hidden="true"`; they carry no semantic meaning.
- Touch supported via Pointer Events (the magnetic effect is mouse-only, but the
  game arms on touch drag too).
- Avatar keeps its `alt` text and is not made a focusable control by this feature.

## Verification

- **Pure unit:** `hitTest` collision math (a handful of cases).
- **In-browser simulation** (same method used across this session): dispatch
  `pointerdown → pointermove(s) past threshold → pointerup`; assert (a) ball
  transform translates during drag, (b) overlay + 6 pins exist while armed,
  (c) after fire, hit pins' transforms change (scattered), (d) after reset the
  overlay is gone, ball is home, and magnetic works again.
- **Screenshots** at arm / fire / scatter / reset for visual confirmation.
- Confirm a plain hover (no drag) still produces only the magnetic pull.

## Out of scope (possible later)

- Optional subtle audio (pin click / strike) behind a mute-by-default toggle.
- Persistent best score.
- Expanding the play area beyond the avatar's immediate neighborhood.
