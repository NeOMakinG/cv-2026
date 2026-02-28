import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import type { Block } from '../types/blockchain';
import './BlockCard.css';

interface BlockCardProps {
  block: Block;
  isActive: boolean;
  onActivate: () => void;
  displayIndex: number;
}

const ROTATION_PAIRS: [number, number][] = [
  [0.5, -3], [-0.8, 3.5], [1, -4], [-0.5, 2.5], [0.8, -3.5],
  [-1, 4], [0.5, -2.5], [-0.8, 3], [1.2, -4], [-0.5, 3.5], [0.8, -3],
];

const TYPE_LABELS: Record<Block['type'], string> = {
  origin: 'GENESIS',
  education: 'EDUCATION',
  work: 'WORK',
  project: 'PROJECT',
  current: 'MINING...',
};

export const BlockCard = ({ block, isActive, onActivate, displayIndex }: BlockCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hashRef = useRef<HTMLSpanElement>(null);
  const [displayHash, setDisplayHash] = useState(block.hash);

  useEffect(() => {
    if (!block.confirmed && hashRef.current) {
      const interval = setInterval(() => {
        const chars = '0123456789abcdef';
        const newHash = '0x' + Array.from({ length: 64 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        setDisplayHash(newHash);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [block.confirmed]);

  useEffect(() => {
    if (isActive && cardRef.current) {
      const svgs = cardRef.current.querySelectorAll('.block-bg-svg');
      svgs.forEach((svg) => {
        gsap.fromTo(svg,
          { opacity: 0, scale: 0.92 },
          { opacity: 0.4, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      });
    }
  }, [isActive]);

  const [r1, r2] = ROTATION_PAIRS[displayIndex % ROTATION_PAIRS.length];

  return (
    <div 
      ref={cardRef}
      className={`block-card ${isActive ? 'active' : ''} ${!block.confirmed ? 'mining' : ''}`}
      onClick={onActivate}
    >
      <img
        src="/block-1.svg"
        className="block-bg-svg block-bg-svg-1"
        style={{ '--base-rotation': `${r1}deg` } as React.CSSProperties}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/block-2.svg"
        className="block-bg-svg block-bg-svg-2"
        style={{ '--base-rotation': `${r2}deg` } as React.CSSProperties}
        alt=""
        aria-hidden="true"
      />

      <div className="block-header">
        <div className="block-index">
          <span className="block-number">#{block.index}</span>
          <span className="block-type">{TYPE_LABELS[block.type]}</span>
        </div>
        <div className="block-status">
          {block.confirmed ? (
            <span className="confirmed">CONFIRMED</span>
          ) : (
            <span className="pending">PENDING</span>
          )}
        </div>
      </div>

      <div className="block-content">
        <h2 className="block-title">{block.title}</h2>
        <h3 className="block-company">{block.company}</h3>
        <div className="block-timestamp">
          <span>{block.timestamp.start} &rarr; {block.timestamp.end || 'Present'}</span>
        </div>
        <p className="block-description">{block.description}</p>
      </div>

      <div className="block-transactions">
        <div className="transactions-header">
          <span>TRANSACTIONS ({block.transactions.length})</span>
        </div>
        <div className="transactions-list">
          {block.transactions.map((tx) => (
            <span key={tx.id} className="transaction">
              {tx.value}
            </span>
          ))}
        </div>
      </div>

      <div className="block-footer">
        <div className="hash-row">
          <span className="hash-label">HASH</span>
          <span ref={hashRef} className="hash-value">{displayHash.slice(0, 18)}...</span>
        </div>
        <div className="hash-row">
          <span className="hash-label">PREV</span>
          <span className="hash-value prev">{block.previousHash.slice(0, 18)}...</span>
        </div>
        {block.confirmed && (
          <div className="nonce-row">
            <span className="nonce-label">NONCE</span>
            <span className="nonce-value">{block.nonce}</span>
          </div>
        )}
      </div>
    </div>
  );
};
