import { useEffect, useRef, useState } from 'react';
import { clamp } from '../utils/clamp';
import { lerp, calculateDecayAlpha } from '../utils/lerp';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';

export interface ScrollProgressState {
  targetProgress: number;
  renderedProgress: number;
}

export function useSmoothScrollProgress(runwayRef: React.RefObject<HTMLDivElement | null>) {
  const targetProgressRef = useRef<number>(0);
  const renderedProgressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const lastEmittedProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [progressState, setProgressState] = useState<ScrollProgressState>({
    targetProgress: 0,
    renderedProgress: 0,
  });

  useEffect(() => {
    const updateTargetProgress = () => {
      if (!runwayRef.current) return;
      const runwayRect = runwayRef.current.getBoundingClientRect();
      const totalScrollableDistance = runwayRect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      // runwayRect.top is negative as we scroll down
      const currentScroll = -runwayRect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      targetProgressRef.current = clamp(rawProgress, 0, 1);
    };

    const tick = (now: number) => {
      const deltaMs = Math.min(now - lastTimeRef.current, 64);
      lastTimeRef.current = now;

      updateTargetProgress();

      const alpha = calculateDecayAlpha(deltaMs, EXPERIENCE_CONFIG.SMOOTHING_MS);
      const prevRendered = renderedProgressRef.current;
      const nextRendered = lerp(prevRendered, targetProgressRef.current, alpha);

      // Snap if very close
      if (Math.abs(nextRendered - targetProgressRef.current) < 0.0001) {
        renderedProgressRef.current = targetProgressRef.current;
      } else {
        renderedProgressRef.current = nextRendered;
      }

      // Emits React state updates ONLY when progress changes significantly (>0.015) to prevent unnecessary re-renders
      if (Math.abs(renderedProgressRef.current - lastEmittedProgressRef.current) > 0.015) {
        lastEmittedProgressRef.current = renderedProgressRef.current;
        setProgressState({
          targetProgress: targetProgressRef.current,
          renderedProgress: renderedProgressRef.current,
        });
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', updateTargetProgress, { passive: true });
    updateTargetProgress();

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', updateTargetProgress);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [runwayRef]);

  return {
    targetProgressRef,
    renderedProgressRef,
    renderedProgress: progressState.renderedProgress,
    targetProgress: progressState.targetProgress,
  };
}
