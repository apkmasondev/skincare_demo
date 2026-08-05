import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { ASSET_MANIFEST } from '../config/assetManifest';
import { getMobileOverlayPhase, OverlayPhase } from '../hooks/useTimedOverlay';
import { ExperienceTextOverlay } from './ExperienceTextOverlay';
import { SoundToggle } from './SoundToggle';

export const MobileSequencePlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [phase, setPhase] = useState<OverlayPhase>('phase1');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setPhase(getMobileOverlayPhase(video.currentTime));
    };

    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
      setPhase('phase3');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Attempt autoplay
    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      if (isEnded) {
        video.currentTime = 0;
        setIsEnded(false);
      }
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <div className="mobile-sequence-stage">
      <div className="mobile-video-container">
        <video
          ref={videoRef}
          src={ASSET_MANIFEST.mobile.sequence}
          poster={ASSET_MANIFEST.posters.intro}
          muted={isMuted}
          playsInline
          autoPlay
          className="mobile-video-element"
        />

        {/* Text Overlay timed with video playback */}
        <ExperienceTextOverlay phase={phase} isMobile={true} />

        {/* Top-Right Sound Toggle Control */}
        <div className="top-right-sound-layer">
          <SoundToggle isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />
        </div>

        {/* Bottom Mobile Playback Controls */}
        <div className="mobile-controls-bar">
          <button
            type="button"
            className="mobile-control-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            type="button"
            className="mobile-control-btn"
            onClick={handleReplay}
            aria-label="Replay video"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
