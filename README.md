# APKMASON Skin Elixir — Premium Product Experience

A luxury one-screen landing page for the APKMASON Skin Elixir skincare concept. Built with React, Vite, TypeScript, and a custom motion engine.

## Core Features
- **Desktop Scroll-Scrubbing**: 3 stacked video layers driven by a custom 145ms exponential lerp inertia engine with max 2.25 frame step caps per tick.
- **Mobile Sequential Playback**: Clean single-video playback for zero-jitter mobile performance.
- **Editorial Luxury UI**: Elegant typography overlays, warm off-white studio aesthetic, discrete sound toggle, and Call-To-Action.
- **Accessibility & Motion Control**: Full support for `prefers-reduced-motion` and keyboard navigation.

## Included Video Assets
### Desktop
- `assets/video/desktop/01-model-to-hand-gop1.mp4`
- `assets/video/desktop/02-product-reveal-gop1.mp4`
- `assets/video/desktop/03-final-packshot-gop1.mp4`
- `assets/video/desktop/00-full-sequence-fallback.mp4`

### Mobile
- `assets/video/mobile/01-03-sequence-mobile.mp4`

### Images
- `assets/images/intro-poster.jpg`
- `assets/images/final-packshot-poster.jpg`

## Development Setup

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

## Architecture
- `src/config/experienceConfig.ts`: Timing parameters, progress ranges, runway height.
- `src/hooks/useSmoothScrollProgress.ts`: Inertia calculation loop.
- `src/hooks/useVideoScrubber.ts`: Imperative DOM video frame stepping & crossfade.
- `src/components/DesktopScrollStage.tsx`: Desktop 3-video sticky stage.
- `src/components/MobileSequencePlayer.tsx`: Mobile video player.

