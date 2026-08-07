import React, { useEffect, useRef, useState } from 'react';

/** How long the confirmation holds before the CTA returns. */
const ACKNOWLEDGEMENT_MS = 5200;

interface PreOrderCtaProps {
  label?: string;
  /** Lets the poster fallback reuse its own button skin. */
  buttonClassName?: string;
  showArrow?: boolean;
  className?: string;
}

/**
 * Pre-order call to action with an in-composition confirmation.
 * The button and the confirmation share one grid cell, so the swap crossfades
 * in place instead of reflowing the layout around it.
 */
export const PreOrderCta: React.FC<PreOrderCtaProps> = ({
  label = 'EXPLORE ELIXIR',
  buttonClassName = 'luxury-cta-btn',
  showArrow = true,
  className = '',
}) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const handleClick = () => {
    setAcknowledged(true);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    // Restore the CTA so the composition never ends on a dead control.
    timeoutRef.current = window.setTimeout(() => {
      setAcknowledged(false);
      timeoutRef.current = null;
    }, ACKNOWLEDGEMENT_MS);
  };

  return (
    <div className={`preorder-cta ${className}`.trim()}>
      <button
        type="button"
        className={buttonClassName}
        onClick={handleClick}
        data-cta-state={acknowledged ? 'hidden' : 'visible'}
        aria-hidden={acknowledged}
        tabIndex={acknowledged ? -1 : 0}
      >
        <span className="cta-text">{label}</span>
        {showArrow && (
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        )}
      </button>

      <p
        className="preorder-confirmation"
        data-cta-state={acknowledged ? 'visible' : 'hidden'}
        role="status"
        aria-live="polite"
      >
        {acknowledged ? 'Pre-orders opening soon — thank you' : ''}
      </p>
    </div>
  );
};
