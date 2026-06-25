import { describe, it, expect } from 'vitest';
import { clampToRadius, launchVelocity, hitTest } from './bowling-physics';

describe('clampToRadius', () => {
  it('leaves a short vector unchanged', () => {
    expect(clampToRadius({ x: 3, y: 4 }, 10)).toEqual({ x: 3, y: 4 });
  });
  it('clamps a long vector to max magnitude, preserving direction', () => {
    const r = clampToRadius({ x: 30, y: 40 }, 10); // mag 50 -> scale 0.2
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

describe('hitTest', () => {
  it('is true when circles overlap', () => {
    expect(hitTest({ x: 0, y: 0 }, 10, { x: 12, y: 0 }, 5)).toBe(true); // dist 12 <= 15
  });
  it('is false when circles are apart', () => {
    expect(hitTest({ x: 0, y: 0 }, 10, { x: 30, y: 0 }, 5)).toBe(false); // dist 30 > 15
  });
});
