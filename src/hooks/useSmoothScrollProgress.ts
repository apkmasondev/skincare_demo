import { useEffect, useRef, useState } from 'react';
import { clamp } from '../utils/clamp';
import { lerp, calculateDecayAlpha } from '../utils/lerp';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';

export interface ScrollProgressState {
  targetProgress: number;
  renderedProgress: number;
}

// Smallest progress delta worth pushing through React. Below this the change is
// invisible (< 0.05% of the runway) and only costs a full re-render of the stage.
const PUBLISH_EPSILON = 0.0005;

export function useSmoothScrollProgress(runwayRef: React.RefObject<HTMLDivElement | null>) {
  const targetProgressRef = useRef<number>(0);
  const renderedProgressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  const [progressState, setProgressState] = useState<ScrollProgressState>({
    targetProgress: 0,
    renderedProgress: 0,
  });
  const publishedRef = useRef<ScrollProgressState>(progressState);

  useEffect(() => {
    const updateTargetProgress = () => {
      if (!runwayRef.current) return;
      const runwayRect = runwayRef.current.getBoundingClientRect();
      const totalScrollableDistance = runwayRect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

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

      if (Math.abs(nextRendered - targetProgressRef.current) < 0.0001) {
        renderedProgressRef.current = targetProgressRef.current;
      } else {
        renderedProgressRef.current = nextRendered;
      }

      const published = publishedRef.current;
      const renderedDelta = Math.abs(renderedProgressRef.current - published.renderedProgress);
      const targetDelta = Math.abs(targetProgressRef.current - published.targetProgress);
      // Always commit the frame where the lerp settles, so the last render is exact.
      const justSettled =
        renderedProgressRef.current === targetProgressRef.current &&
        renderedProgressRef.current !== published.renderedProgress;

      if (renderedDelta > PUBLISH_EPSILON || targetDelta > PUBLISH_EPSILON || justSettled) {
        const next: ScrollProgressState = {
          targetProgress: targetProgressRef.current,
          renderedProgress: renderedProgressRef.current,
        };
        publishedRef.current = next;
        setProgressState(next);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    // No scroll/resize listeners needed: the RAF loop reads the runway rect every
    // frame anyway, and listening as well would force a second layout per event.
    updateTargetProgress();

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
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
