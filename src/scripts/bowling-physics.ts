// Pure geometry helpers for the hero bowling easter egg. No DOM, no side effects.

export type Vec = { x: number; y: number };

/** Clamp a vector's magnitude to `max` (direction preserved). */
export function clampToRadius(v: Vec, max: number): Vec {
  const mag = Math.hypot(v.x, v.y);
  if (mag === 0 || mag <= max) return { x: v.x, y: v.y };
  const s = max / mag;
  return { x: v.x * s, y: v.y * s };
}

/** Slingshot launch velocity: flings from `release` back toward `home`. */
export function launchVelocity(home: Vec, release: Vec, k: number): Vec {
  return { x: (home.x - release.x) * k, y: (home.y - release.y) * k };
}

/** Circle/circle overlap test between the ball and a pin. */
export function hitTest(ball: Vec, ballR: number, pin: Vec, pinR: number): boolean {
  return Math.hypot(ball.x - pin.x, ball.y - pin.y) <= ballR + pinR;
}

/** Six pin centres in a 1-2-3 triangle (single pin at top), centred on `center`. */
export function pinTriangle(center: Vec, spacing: number): Vec[] {
  const rows = [1, 2, 3]; // pins per row, top -> bottom
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
