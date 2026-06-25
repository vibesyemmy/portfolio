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
