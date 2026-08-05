import { useState, useEffect } from 'react';
import { checkIsMobile, checkPrefersReducedMotion } from '../utils/media';

export type MediaMode = 'desktop' | 'mobile' | 'reduced-motion';

export function useMediaMode(): MediaMode {
  const [mode, setMode] = useState<MediaMode>(() => {
    if (checkPrefersReducedMotion()) return 'reduced-motion';
    return checkIsMobile() ? 'mobile' : 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      if (checkPrefersReducedMotion()) {
        setMode('reduced-motion');
      } else {
        setMode(checkIsMobile() ? 'mobile' : 'desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMode('reduced-motion');
      } else {
        setMode(checkIsMobile() ? 'mobile' : 'desktop');
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return mode;
}
