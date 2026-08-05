import React from 'react';
import { useMediaMode } from '../hooks/useMediaMode';
import { DesktopScrollStage } from './DesktopScrollStage';
import { MobileSequencePlayer } from './MobileSequencePlayer';
import { PosterFallback } from './PosterFallback';

export const SkincareExperience: React.FC = () => {
  const mode = useMediaMode();

  if (mode === 'reduced-motion') {
    return <PosterFallback />;
  }

  if (mode === 'mobile') {
    return <MobileSequencePlayer />;
  }

  return <DesktopScrollStage />;
};
