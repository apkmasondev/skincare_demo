import { EXPERIENCE_CONFIG } from '../config/experienceConfig';

export type OverlayPhase = 'phase1' | 'phase2' | 'phase3';

/** `none` is the deliberate quiet gap between two phases: no copy on screen. */
export type OverlayPhaseState = OverlayPhase | 'none';

export function getDesktopOverlayPhase(progress: number): OverlayPhaseState {
  const { DESKTOP_OVERLAY_PHASES: phases } = EXPERIENCE_CONFIG;

  // Checked newest-first so the final phase holds open to the end of the runway.
  if (progress >= phases.phase3.start) return 'phase3';
  if (progress >= phases.phase2.start && progress <= phases.phase2.end) return 'phase2';
  if (progress >= phases.phase1.start && progress <= phases.phase1.end) return 'phase1';
  return 'none';
}

export function getMobileOverlayPhase(currentTimeSeconds: number): OverlayPhaseState {
  const { MOBILE_OVERLAY_CHECKPOINTS: checkpoints } = EXPERIENCE_CONFIG;

  if (currentTimeSeconds >= checkpoints.phase3.start) return 'phase3';
  if (
    currentTimeSeconds >= checkpoints.phase2.start &&
    currentTimeSeconds <= checkpoints.phase2.end
  ) {
    return 'phase2';
  }
  if (
    currentTimeSeconds >= checkpoints.phase1.start &&
    currentTimeSeconds <= checkpoints.phase1.end
  ) {
    return 'phase1';
  }
  return 'none';
}
