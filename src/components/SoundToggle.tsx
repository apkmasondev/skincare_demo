import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { luxurySoundtrack } from '../utils/audio';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle, className = '' }) => {
  const handleClick = () => {
    const nextMuted = !isMuted;
    luxurySoundtrack.toggle(!nextMuted);
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
      title={isMuted ? 'Sound OFF' : 'Sound ON'}
      className={`sound-icon-btn ${isMuted ? 'is-muted' : 'is-active'} ${className}`}
    >
      {isMuted ? (
        <VolumeX className="sound-icon" size={20} />
      ) : (
        <Volume2 className="sound-icon" size={20} />
      )}
    </button>
  );
};
