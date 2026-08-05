import React from 'react';
import { OverlayPhase } from '../hooks/useTimedOverlay';

interface ExperienceTextOverlayProps {
  phase: OverlayPhase;
  renderedProgress?: number;
  isMobile?: boolean;
}

export const ExperienceTextOverlay: React.FC<ExperienceTextOverlayProps> = ({
  phase,
  renderedProgress = 0,
  isMobile = false,
}) => {
  return (
    <div className={`experience-text-overlay ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      {/* Phase 1 Overlay (Early: Formed from light) */}
      <div className={`overlay-phase phase-1 ${phase === 'phase1' ? 'active' : ''}`}>
        <div className="phase1-content pure-editorial-text">
          <p className="overline">CHAPTER 01</p>
          <h2 className="headline">FORMED FROM LIGHT</h2>
          <p className="sub-headline">SHAPED BY PRECISION</p>
        </div>
      </div>

      {/* Phase 2 Overlay (Mid: Product Reveal - Positioned in Side Negative Space) */}
      <div className={`overlay-phase phase-2 ${phase === 'phase2' ? 'active' : ''}`}>
        <div className="phase2-content pure-editorial-text">
          <p className="overline">CHAPTER 02</p>
          <h1 className="hero-title">SCULPTED IN GLASS</h1>
          <h2 className="hero-subtitle">BOTANICAL PRECISION</h2>
        </div>
      </div>

      {/* Phase 3 Overlay (Final: Pure Typography Side Composition) */}
      <div className={`overlay-phase phase-3 ${phase === 'phase3' ? 'active' : ''}`}>
        <div className="phase3-layout">
          {/* Left side composition */}
          <div className="phase3-left pure-editorial-text">
            <span className="edition-badge">LIMITED EDITION</span>
            <h2 className="brand-title">APKMASON</h2>
            <h3 className="product-title">SKIN ELIXIR</h3>
          </div>

          {/* Right side composition */}
          <div className="phase3-right pure-editorial-text">
            <span className="gold-accent-divider" aria-hidden="true" />
            <p className="tagline">Radiance in its <em>purest form</em></p>
            <p className="description">
              A transformative glass-encapsulated formula delivering <strong className="highlight-text">cellular clarity</strong> and <strong className="highlight-text">immediate luminosity</strong>.
            </p>
            <div className="cta-wrapper">
              <button
                type="button"
                className="luxury-cta-btn"
                onClick={() => {
                  alert('Thank you for exploring APKMASON Skin Elixir. Pre-orders opening soon.');
                }}
              >
                <span className="cta-text">EXPLORE ELIXIR</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
              <div className="luxury-meta-badge">50 ML / 1.7 FL. OZ. &nbsp;·&nbsp; FORMULATED IN SWITZERLAND</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll / Progress Indicator for Desktop */}
      {!isMobile && renderedProgress > 0 && renderedProgress < 0.95 && (
        <div className="scroll-indicator">
          <span className="indicator-text">SCROLL TO TRANSFORM</span>
          <div className="indicator-track">
            <div className="indicator-bar" style={{ width: `${Math.min(renderedProgress * 100, 100)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};
