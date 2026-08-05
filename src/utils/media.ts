import { EXPERIENCE_CONFIG } from '../config/experienceConfig';

/**
 * Utility to check viewport mobile breakpoint and prefers-reduced-motion media query.
 */
export function checkIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isNarrow = window.innerWidth <= EXPERIENCE_CONFIG.MOBILE_BREAKPOINT_PX;
  return isNarrow || (hasTouch && window.innerWidth < 1024);
}

export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
