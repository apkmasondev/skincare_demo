import { ASSET_MANIFEST } from '../config/assetManifest';

/**
 * Production-Grade Luxury Soundtrack Engine for APKMASON Skin Elixir.
 * Manages high-bitrate compressed audio playback with smooth volume fade-in/out
 * and race-condition session token validation.
 */
class LuxurySoundtrackEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private fadeInterval: number | null = null;
  private sessionToken = 0;
  private readonly targetVolume = 0.65;

  private getAudio(): HTMLAudioElement | null {
    if (!this.audio && typeof window !== 'undefined') {
      try {
        this.audio = new Audio(ASSET_MANIFEST.audio.soundtrack);
        this.audio.loop = true;
        this.audio.volume = 0;
      } catch {
        this.audio = null;
      }
    }
    return this.audio;
  }

  public play() {
    const audio = this.getAudio();
    if (!audio) return;

    this.sessionToken++;
    const currentToken = this.sessionToken;

    if (this.fadeInterval !== null) {
      window.clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    this.isPlaying = true;

    audio
      .play()
      .then(() => {
        if (currentToken !== this.sessionToken || !this.isPlaying) return;

        let currentVol = audio.volume;
        this.fadeInterval = window.setInterval(() => {
          if (currentToken !== this.sessionToken) {
            if (this.fadeInterval !== null) {
              window.clearInterval(this.fadeInterval);
              this.fadeInterval = null;
            }
            return;
          }

          if (currentVol < this.targetVolume) {
            currentVol = Math.min(this.targetVolume, currentVol + 0.04);
            audio.volume = currentVol;
          } else {
            if (this.fadeInterval !== null) {
              window.clearInterval(this.fadeInterval);
              this.fadeInterval = null;
            }
          }
        }, 50);
      })
      .catch(() => {
        if (currentToken === this.sessionToken) {
          this.isPlaying = false;
        }
      });
  }

  public pause() {
    this.sessionToken++;
    const currentToken = this.sessionToken;

    if (!this.audio || !this.isPlaying) return;
    const audio = this.audio;

    if (this.fadeInterval !== null) {
      window.clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    let currentVol = audio.volume;
    this.fadeInterval = window.setInterval(() => {
      if (currentToken !== this.sessionToken) {
        if (this.fadeInterval !== null) {
          window.clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        return;
      }

      if (currentVol > 0.03) {
        currentVol = Math.max(0, currentVol - 0.05);
        audio.volume = currentVol;
      } else {
        audio.volume = 0;
        audio.pause();
        this.isPlaying = false;
        if (this.fadeInterval !== null) {
          window.clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }
    }, 40);
  }

  public stop() {
    this.sessionToken++;
    this.isPlaying = false;
    if (this.fadeInterval !== null) {
      window.clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.volume = 0;
      this.audio.currentTime = 0;
    }
  }

  public toggle(shouldPlay: boolean) {
    if (shouldPlay) {
      this.play();
    } else {
      this.pause();
    }
  }
}

export const luxurySoundtrack = new LuxurySoundtrackEngine();
