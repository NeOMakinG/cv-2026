import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import type { ChainExperience } from '../data/chains';
import './ChainModal.css';

interface ChainModalProps {
  chain: ChainExperience | null;
  onClose: () => void;
}

export const ChainModal = ({ chain, onClose }: ChainModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.2, ease: 'power2.in' },
      '-=0.15',
    );
  }, [onClose]);

  useEffect(() => {
    if (!chain) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' },
    );
    gsap.fromTo(
      contentRef.current,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 },
    );
  }, [chain]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [animateClose]);

  if (!chain) return null;

  const categoryLabel: Record<string, string> = {
    l1: 'LAYER 1',
    'evm-l2': 'EVM L2',
    'non-evm': 'NON-EVM',
  };

  return (
    <div ref={overlayRef} className="chain-modal-overlay" onClick={animateClose}>
      <div
        ref={contentRef}
        className="chain-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="chain-modal-close" onClick={animateClose}>
          &times;
        </button>

        <div className="chain-modal-header">
          <img src={chain.icon} alt={chain.name} className="chain-modal-icon" />
          <div>
            <h2 className="chain-modal-name">{chain.name}</h2>
            <span className="chain-modal-category">
              {categoryLabel[chain.category] ?? chain.category}
            </span>
          </div>
        </div>

        <p className="chain-modal-tagline">{chain.tagline}</p>
        <p className="chain-modal-description">{chain.description}</p>

        {chain.highlights.length > 0 && (
          <div className="chain-modal-section">
            <h3 className="chain-modal-section-title">HIGHLIGHTS</h3>
            <ul className="chain-modal-highlights">
              {chain.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {chain.protocols.length > 0 && (
          <div className="chain-modal-section">
            <h3 className="chain-modal-section-title">PROTOCOLS</h3>
            <div className="chain-modal-protocols">
              {chain.protocols.map((p) => (
                <span key={p} className="chain-modal-protocol-tag">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {chain.prLink && (
          <a
            href={chain.prLink}
            target="_blank"
            rel="noopener noreferrer"
            className="chain-modal-pr-link"
          >
            View PRs on GitHub &rarr;
          </a>
        )}
      </div>
    </div>
  );
};
