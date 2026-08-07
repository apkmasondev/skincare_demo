import React, { useState } from 'react';
import { useMediaMode } from '../hooks/useMediaMode';
import { DesktopScrollStage } from './DesktopScrollStage';
import { MobileSequencePlayer } from './MobileSequencePlayer';
import { PosterFallback } from './PosterFallback';

export const SkincareExperience: React.FC = () => {
  const { mode, isMobileViewport } = useMediaMode();
  const [motionOptIn, setMotionOptIn] = useState(false);

  // Reduced-motion visitors get the still composition by default, but they keep a
  // way into the campaign film — otherwise the poster is a dead end for them.
  if (mode === 'reduced-motion' && !motionOptIn) {
    return <PosterFallback onPlayAnyway={() => setMotionOptIn(true)} />;
  }

  if (mode === 'mobile' || (mode === 'reduced-motion' && isMobileViewport)) {
    return <MobileSequencePlayer />;
  }

  return <DesktopScrollStage />;
};
