import { useEffect, useRef } from 'react';
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
  // Track last displayed frame indices to enforce 2.25 max step cap
  const currentFramesRef = useRef<{ film1: number; film2: number; film3: number }>({
    film1: 0,
    film2: 0,
    film3: 0,
  });

  useEffect(() => {
    let animationFrameId: number;

    const scrubTick = () => {
      const overallProgress = renderedProgressRef.current ?? 0;
      const { LAYERS, MAX_FRAMES_PER_TICK, VIDEO_FPS } = EXPERIENCE_CONFIG;

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
        video.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';

        // Only scrub video frames if layer is visible or near visible
        if (opacity > 0.001 || (overallProgress >= pStart - 0.05 && overallProgress <= pEnd + 0.05)) {
          // Calculate normalized segment progress (0.0 to 1.0)
          const segmentProgress = clamp((overallProgress - pStart) / (pEnd - pStart), 0, 1);

          // Get total duration / frames
          const duration = video.duration || (config.totalFrames / VIDEO_FPS);
          const maxFrame = Math.max(1, Math.round(duration * VIDEO_FPS));
          const targetFrame = segmentProgress * maxFrame;

          // Frame motion capping: max 2.25 frames per tick
          const currentFrame = currentFramesRef.current[layerId];
          const frameDiff = targetFrame - currentFrame;

          let nextFrame = currentFrame;
          if (Math.abs(frameDiff) > 0.01) {
            const step = Math.sign(frameDiff) * Math.min(Math.abs(frameDiff), MAX_FRAMES_PER_TICK);
            nextFrame = clamp(currentFrame + step, 0, maxFrame);
          } else {
            nextFrame = targetFrame;
          }

          currentFramesRef.current[layerId] = nextFrame;

          // Convert target frame to target time
          const targetTime = nextFrame / VIDEO_FPS;

          // Update video.currentTime if diff is meaningful
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
