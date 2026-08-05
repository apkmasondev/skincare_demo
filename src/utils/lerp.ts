/**
 * Linear interpolation between current and target value.
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/**
 * Calculates exponential decay alpha factor for frame-rate independent lerp.
 * @param deltaMs Elapsed time in milliseconds
 * @param halfLifeMs Time constant (e.g. 145ms for IRIS soft inertia)
 */
export function calculateDecayAlpha(deltaMs: number, halfLifeMs: number): number {
  if (deltaMs <= 0) return 0;
  return 1 - Math.exp(-deltaMs / halfLifeMs);
}
