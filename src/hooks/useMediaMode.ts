import { useState, useEffect } from 'react';
import { checkIsMobile, checkPrefersReducedMotion } from '../utils/media';

export type MediaMode = 'desktop' | 'mobile' | 'reduced-motion';

export interface MediaModeState {
  mode: MediaMode;
  /** Viewport shape on its own, so a reduced-motion opt-in still lands on the right stage. */
  isMobileViewport: boolean;
}

function resolveMediaState(): MediaModeState {
  const isMobileViewport = checkIsMobile();
  if (checkPrefersReducedMotion()) {
    return { mode: 'reduced-motion', isMobileViewport };
  }
  return { mode: isMobileViewport ? 'mobile' : 'desktop', isMobileViewport };
}

export function useMediaMode(): MediaModeState {
  const [state, setState] = useState<MediaModeState>(resolveMediaState);

  useEffect(() => {
    const sync = () => {
      setState((prev) => {
        const next = resolveMediaState();
        // Resize fires continuously; keep the old object so consumers don't re-render.
        return prev.mode === next.mode && prev.isMobileViewport === next.isMobileViewport
          ? prev
          : next;
      });
    };

    // The initial state is sampled during render, before these listeners exist. Any
    // resize in that gap (very common: the viewport is still settling on first paint)
    // would otherwise leave us stuck on the wrong stage until the user resizes again.
    sync();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('resize', sync);
    window.addEventListener('orientationchange', sync);
    motionQuery.addEventListener('change', sync);

    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('orientationchange', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, []);

  return state;
}
