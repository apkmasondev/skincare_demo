export interface ProgressRange {
  start: number;
  end: number;
}

export interface VideoLayerConfig {
  id: 'film1' | 'film2' | 'film3';
  src: string;
  totalFrames: number; // estimated frames at 30fps
  progressRange: ProgressRange;
  fadeInRange: ProgressRange;
  fadeOutRange: ProgressRange;
}

export const EXPERIENCE_CONFIG = {
  // Vertical runway height multiplier for scroll progress
  SCROLL_RUNWAY_VH: 1040,

  // IRIS-style exponential lerp inertia (ms)
  SMOOTHING_MS: 145,

  // Frame rate standard for GOP1 videos
  VIDEO_FPS: 30,

  // Mobile breakpoint
  MOBILE_BREAKPOINT_PX: 768,

  // Zero-Flash Layer Stacking (Lower layer stays solid while upper layer fades in over it)
  LAYERS: {
    film1: {
      id: 'film1',
      src: './assets/video/desktop/01-model-to-hand-gop1.mp4',
      totalFrames: 180,
      progressRange: { start: 0.0, end: 0.38 },
      fadeInRange: { start: 0.0, end: 0.0 }, // Solid from the very first frame (no fade-up from empty stage)
      fadeOutRange: { start: 1.0, end: 1.0 }, // Stays solid under Layer 2
    },
    film2: {
      id: 'film2',
      src: './assets/video/desktop/02-product-reveal-gop1.mp4',
      totalFrames: 240,
      progressRange: { start: 0.34, end: 0.78 },
      fadeInRange: { start: 0.34, end: 0.38 }, // Fades in smoothly over Layer 1
      fadeOutRange: { start: 1.0, end: 1.0 }, // Stays solid under Layer 3
    },
    film3: {
      id: 'film3',
      src: './assets/video/desktop/03-final-packshot-gop1.mp4',
      totalFrames: 210,
      progressRange: { start: 0.74, end: 1.0 },
      fadeInRange: { start: 0.74, end: 0.78 }, // Fades in smoothly over Layer 2
      fadeOutRange: { start: 1.0, end: 1.0 }, // Holds permanently on final packshot
    },
  } as Record<string, VideoLayerConfig>,

  // Text overlay thresholds for Desktop (by progress)
  DESKTOP_OVERLAY_PHASES: {
    phase1: { start: 0.0, end: 0.30 }, // Early: Formed from Light
    phase2: { start: 0.34, end: 0.72 }, // Mid: APKMASON Skin Elixir
    phase3: { start: 0.75, end: 1.0 },  // Final hero composition with CTA
  },

  // Text overlay thresholds for Mobile (by video currentTime in seconds)
  MOBILE_OVERLAY_CHECKPOINTS: {
    phase1: { start: 0, end: 7 },
    phase2: { start: 8, end: 17 },
    phase3: { start: 18, end: 999 },
  },
} as const;
