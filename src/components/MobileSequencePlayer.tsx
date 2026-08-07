import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { ASSET_MANIFEST } from '../config/assetManifest';
import { getMobileOverlayPhase, OverlayPhaseState } from '../hooks/useTimedOverlay';
import { ExperienceTextOverlay } from './ExperienceTextOverlay';
import { SoundToggle } from './SoundToggle';
import { luxurySoundtrack } from '../utils/audio';

export const MobileSequencePlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMountedRef = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [phase, setPhase] = useState<OverlayPhaseState>('phase1');

  useEffect(() => {
    isMountedRef.current = true;
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isMountedRef.current) {
        setPhase(getMobileOverlayPhase(video.currentTime));
      }
    };

    const handleEnded = () => {
      if (isMountedRef.current) {
        setIsEnded(true);
        setIsPlaying(false);
        setPhase('phase3');
      }
    };

    // Mirror the element's real playback state instead of assuming our own calls
    // won. `autoPlay` and the manual play() below can interrupt each other, which
    // would otherwise leave the play/pause button showing the wrong icon.
    const handlePlay = () => {
      if (isMountedRef.current) setIsPlaying(true);
    };
    const handlePause = () => {
      if (isMountedRef.current) setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt autoplay
    video.play().catch(() => {
      if (isMountedRef.current) {
        setIsPlaying(false);
      }
    });

    return () => {
      isMountedRef.current = false;
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      // Stop the singleton soundtrack; it has no owner once this stage unmounts.
      luxurySoundtrack.stop();
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
      video.play().then(() => {
        if (isMountedRef.current) setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    video.play().then(() => {
      if (isMountedRef.current) setIsPlaying(true);
    }).catch(() => {});
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
