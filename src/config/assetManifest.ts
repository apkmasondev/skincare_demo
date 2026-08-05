export const ASSET_MANIFEST = {
  desktop: {
    film1: '/assets/video/desktop/01-model-to-hand-gop1.mp4',
    film2: '/assets/video/desktop/02-product-reveal-gop1.mp4',
    film3: '/assets/video/desktop/03-final-packshot-gop1.mp4',
    fallback: '/assets/video/desktop/00-full-sequence-fallback.mp4',
  },
  mobile: {
    sequence: '/assets/video/mobile/01-03-sequence-mobile.mp4',
  },
  audio: {
    soundtrack: '/assets/audio/soundtrack.mp3',
  },
  posters: {
    intro: '/assets/images/intro-poster.jpg',
    finalPackshot: '/assets/images/final-packshot-poster.jpg',
  },
} as const;
