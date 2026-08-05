# Changelog

All notable changes to the APKMASON Skin Elixir project will be documented in this file.

## [1.4.1] - 2026-08-05

### Fixed
- Relocated video (`assets/video`) and image (`assets/images`) assets into `public/assets/` to ensure Vite bundle inclusion during `npm run build`.
- Updated asset manifests (`experienceConfig.ts` and `assetManifest.ts`) to use relative asset URLs (`./assets/...`), fixing 404 video/audio loading errors on GitHub Pages subpaths.
- Added GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) for automated Vite builds on GitHub Pages.

## [1.4.0] - 2026-08-05

### Changed
- Re-aligned Desktop Chapter 3 text blocks (`.phase3-left` and `.phase3-right`) to align-items: center, raising them to mid-screen height aligned with the central hero bottle.
- Conducted full pre-deployment master audit for TypeScript type-safety, memory management, responsiveness, and clean architecture.

## [1.3.2] - 2026-08-05

### Fixed
- Implemented Apple-style zero-flash video layer stacking (`Film 1: z-2`, `Film 2: z-3`, `Film 3: z-4`). Lower video layers remain 100% solid underneath while upper layers fade in smoothly over them, completely eliminating white background flashes and ghosting.

## [1.3.1] - 2026-08-05

### Changed
- Implemented Option A ultra-tight video layer crossfades (`0.5%` – `1%` micro-mix window) between Film 1/Film 2 and Film 2/Film 3 to eliminate all ghosting and create a crisp, high-end editorial transition.

## [1.3.0] - 2026-08-05

### Added
- Compressed original 24.5 MB WAV file (`APKMASON Skin Elixir.wav`) to high-quality 192kbps MP3 (`public/assets/audio/soundtrack.mp3`, 3.07 MB).
- Integrated production-grade `LuxurySoundtrackEngine` with smooth volume fade-in and fade-out.
- Created luxury vector monogram SVG favicon featuring letter 'A' (`public/favicon.svg`).

### Changed
- Completely hidden native browser scrollbars across all viewports (Chrome, Safari, Firefox, Edge).

## [1.2.0] - 2026-08-05

### Changed
- Removed top header brand badges (`APKMASON — PARS` and `PURE FORM NO. 01`).
- Moved the sound toggle control to a minimalist luxury icon button in the top-right corner on both desktop and mobile viewports.
- Configured Film 3 (`03-final-packshot-gop1.mp4`) to hold permanently on its final frame at the end of the scroll runway, eliminating white background fade-out.
- Ensured mobile sequence player pauses cleanly on the final packshot frame at video completion.

## [1.1.0] - 2026-08-05

### Changed
- Removed rectangular glass card backgrounds around text overlays to achieve a pure, high-editorial luxury campaign aesthetic.
- Re-aligned typography into natural negative studio space on the left and right sides of the model/bottle across all chapters.
- Ensured zero overlap between overlay copy and the central hero product bottle on both Desktop and Mobile.
- Added Web Audio ambient soundscape engine to the sound toggle control.

## [1.0.0] - 2026-08-04

### Added
- Created Vite + React + TypeScript single-screen landing page for APKMASON Skin Elixir based on `PLAN.md`.
- Implemented desktop scroll scrubbing engine driven by requestAnimationFrame with exponential decay (145ms inertia) and maximum frame step capping (2.25 frames/tick).
- Implemented 3-layer HTMLVideoElement crossfade logic for Film 1 (Model to Hand), Film 2 (Product Reveal), and Film 3 (Final Packshot).
- Implemented mobile single sequential playback mode for high performance and zero scroll jitter.
- Added phase-based luxury typography overlays ("FORMED FROM LIGHT", "SHAPED BY PRECISION", "APKMASON SKIN ELIXIR", and final call-to-action).
- Added sound controls, replay button, and reduced motion fallback poster view.
- Added full responsive design system using warm off-white tones and luxury typography.
