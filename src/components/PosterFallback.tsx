import React from 'react';
import { ASSET_MANIFEST } from '../config/assetManifest';
import { PreOrderCta } from './PreOrderCta';

interface PosterFallbackProps {
  onPlayAnyway?: () => void;
}

export const PosterFallback: React.FC<PosterFallbackProps> = ({ onPlayAnyway }) => {
  return (
    <div className="poster-fallback-container">
      <div className="poster-image-wrapper">
        <img
          src={ASSET_MANIFEST.posters.finalPackshot}
          alt="APKMASON Skin Elixir bottle poster"
          className="poster-image"
        />
        <div className="poster-scrim" />
      </div>

      <div className="poster-content">
        <header className="poster-header">
          <span className="brand-tag">APKMASON</span>
          <h1 className="poster-title">SKIN ELIXIR</h1>
        </header>

        <p className="poster-subtitle">Radiance in its purest form</p>

        <div className="poster-actions">
          {/* The page does not scroll in this mode, so the CTA carries the same
              pre-order message as the main experience rather than a no-op scroll. */}
          <PreOrderCta
            buttonClassName="cta-button"
            showArrow={false}
            className="preorder-cta--center"
          />
          {onPlayAnyway && (
            <button type="button" className="secondary-button" onClick={onPlayAnyway}>
              WATCH CAMPAIGN FILM
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
