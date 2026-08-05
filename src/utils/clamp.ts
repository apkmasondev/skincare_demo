/**
 * Clamps a numerical value between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
