import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EXPERIENCE_CONFIG } from '../config/experienceConfig';
import { ASSET_MANIFEST } from '../config/assetManifest';
import { useSmoothScrollProgress } from '../hooks/useSmoothScrollProgress';
import { useVideoScrubber, VideoLayerRefs } from '../hooks/useVideoScrubber';
import { getDesktopOverlayPhase } from '../hooks/useTimedOverlay';
import { ExperienceTextOverlay } from './ExperienceTextOverlay';
import { SoundToggle } from './SoundToggle';
import { luxurySoundtrack } from '../utils/audio';

export const DesktopScrollStage: React.FC = () => {
  const runwayRef = useRef<HTMLDivElement>(null);

  // Video element refs
  const film1Ref = useRef<HTMLVideoElement>(null);
  const film2Ref = useRef<HTMLVideoElement>(null);
  const film3Ref = useRef<HTMLVideoElement>(null);

  const videoRefs: VideoLayerRefs = useMemo(
    () => ({
      film1: film1Ref,
      film2: film2Ref,
      film3: film3Ref,
    }),
    []
  );

  // Sound state
  const [isMuted, setIsMuted] = useState(true);

  // The soundtrack engine is a module singleton, so it outlives this component.
  // Without this it keeps looping after a switch to the mobile/reduced-motion stage,
  // with no visible control left to stop it.
  useEffect(() => () => luxurySoundtrack.stop(), []);

  // Smooth scroll progress hook (145ms exponential lerp inertia)
  const { renderedProgressRef, renderedProgress } = useSmoothScrollProgress(runwayRef);

  // Custom frame scrubbing hook (max 2.25 frames per tick cap)
  useVideoScrubber(renderedProgressRef, videoRefs);

  // Determine current overlay phase
  const currentPhase = getDesktopOverlayPhase(renderedProgress);

  return (
    <div
      ref={runwayRef}
      className="desktop-scroll-runway"
      style={{ height: `${EXPERIENCE_CONFIG.SCROLL_RUNWAY_VH}vh` }}
    >
      <div className="desktop-sticky-stage">
        {/* Background Studio Base */}
        <div className="studio-background" />

        {/* Video Layer 1: Model to Hand */}
        <video
          ref={film1Ref}
          src={ASSET_MANIFEST.desktop.film1}
          poster={ASSET_MANIFEST.posters.intro}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="desktop-video-layer layer-1"
        />

        {/* Video Layer 2: Product Reveal */}
        <video
          ref={film2Ref}
          src={ASSET_MANIFEST.desktop.film2}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="desktop-video-layer layer-2"
        />

        {/* Video Layer 3: Final Packshot */}
        <video
          ref={film3Ref}
          src={ASSET_MANIFEST.desktop.film3}
          poster={ASSET_MANIFEST.posters.finalPackshot}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="desktop-video-layer layer-3"
        />

        {/* Editorial Text Overlay */}
        <ExperienceTextOverlay phase={currentPhase} renderedProgress={renderedProgress} />

        {/* Top-Right Sound Toggle Control */}
        <div className="top-right-sound-layer">
          <SoundToggle isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />
        </div>
      </div>
    </div>
  );
};
