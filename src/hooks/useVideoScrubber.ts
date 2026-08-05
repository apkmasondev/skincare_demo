import { useEffect } from 'react';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import { clamp } from '../utils/clamp';

export interface VideoLayerRefs {
  film1: React.RefObject<HTMLVideoElement | null>;
  film2: React.RefObject<HTMLVideoElement | null>;
  film3: React.RefObject<HTMLVideoElement | null>;
}

export function useVideoScrubber(
  renderedProgressRef: React.RefObject<number>,
  videoRefs: VideoLayerRefs
) {
  useEffect(() => {
    let animationFrameId: number;

    const scrubTick = () => {
      const overallProgress = renderedProgressRef.current ?? 0;
      const { LAYERS, VIDEO_FPS } = EXPERIENCE_CONFIG;

      (['film1', 'film2', 'film3'] as const).forEach((layerId) => {
        const video = videoRefs[layerId].current;
        if (!video) return;

        const config = LAYERS[layerId];
        const { start: pStart, end: pEnd } = config.progressRange;

        // Calculate opacity based on crossfade ranges
        let opacity = 0;
        if (overallProgress >= config.fadeInRange.start && overallProgress <= config.fadeOutRange.end) {
          // Fade in phase
          if (overallProgress < config.fadeInRange.end && config.fadeInRange.start !== config.fadeInRange.end) {
            opacity = clamp(
              (overallProgress - config.fadeInRange.start) /
                (config.fadeInRange.end - config.fadeInRange.start),
              0,
              1
            );
          } 
          // Fade out phase
          else if (overallProgress > config.fadeOutRange.start) {
            opacity = clamp(
              1 -
                (overallProgress - config.fadeOutRange.start) /
                  (config.fadeOutRange.end - config.fadeOutRange.start),
              0,
              1
            );
          } 
          // Solid phase
          else {
            opacity = 1;
          }
        }

        // Apply opacity directly to video element
        video.style.opacity = opacity.toFixed(3);
        video.style.visibility = opacity > 0.005 ? 'visible' : 'hidden';

        // Synchronize video currentTime directly with renderedProgress (which already has 145ms exponential lerp inertia)
        if (opacity > 0.001 || (overallProgress >= pStart - 0.05 && overallProgress <= pEnd + 0.05)) {
          // Calculate normalized segment progress (0.0 to 1.0)
          const segmentProgress = clamp((overallProgress - pStart) / (pEnd - pStart), 0, 1);

          // Get total duration / frames
          const duration = video.duration || (config.totalFrames / VIDEO_FPS);
          const targetTime = segmentProgress * duration;

          // Update video.currentTime if diff is meaningful (>8ms)
          if (!isNaN(targetTime) && isFinite(targetTime) && Math.abs(video.currentTime - targetTime) > 0.008) {
            try {
              video.currentTime = targetTime;
            } catch {
              // Ignore potential seeking interrupts during rapid updates
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(scrubTick);
    };

    animationFrameId = requestAnimationFrame(scrubTick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [renderedProgressRef, videoRefs]);
}
