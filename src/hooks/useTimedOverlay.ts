import { EXPERIENCE_CONFIG } from '../config/experienceConfig';

export type OverlayPhase = 'phase1' | 'phase2' | 'phase3';

export function getDesktopOverlayPhase(progress: number): OverlayPhase {
  const { DESKTOP_OVERLAY_PHASES } = EXPERIENCE_CONFIG;
  if (progress <= DESKTOP_OVERLAY_PHASES.phase1.end) {
    return 'phase1';
  } else if (progress <= DESKTOP_OVERLAY_PHASES.phase2.end) {
    return 'phase2';
  } else {
    return 'phase3';
  }
}

export function getMobileOverlayPhase(currentTimeSeconds: number): OverlayPhase {
  const { MOBILE_OVERLAY_CHECKPOINTS } = EXPERIENCE_CONFIG;
  if (currentTimeSeconds <= MOBILE_OVERLAY_CHECKPOINTS.phase1.end) {
    return 'phase1';
  } else if (currentTimeSeconds <= MOBILE_OVERLAY_CHECKPOINTS.phase2.end) {
    return 'phase2';
  } else {
    return 'phase3';
  }
}
