import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import type { Block } from '../types/blockchain';
import './BlockCard.css';

interface BlockCardProps {
  block: Block;
  isActive: boolean;
  onActivate: () => void;
}

export const BlockCard = ({ block, isActive, onActivate }: BlockCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hashRef = useRef<HTMLSpanElement>(null);
  const [displayHash, setDisplayHash] = useState(block.hash);
  
  // Animate hash on hover for pending blocks
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
      gsap.fromTo(cardRef.current, 
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isActive]);

  const typeColors: Record<Block['type'], string> = {
    origin: '#10b981',    // emerald
    education: '#8b5cf6', // violet
    work: '#06b6d4',      // cyan
    project: '#f59e0b',   // amber
    current: '#ef4444',   // red (mining)
  };

  const typeLabels: Record<Block['type'], string> = {
    origin: 'GENESIS',
    education: 'EDUCATION',
    work: 'WORK',
    project: 'PROJECT',
    current: 'MINING...',
  };

  return (
    <div 
      ref={cardRef}
      className={`block-card ${isActive ? 'active' : ''} ${!block.confirmed ? 'mining' : ''}`}
      onClick={onActivate}
      style={{ '--accent-color': typeColors[block.type] } as React.CSSProperties}
    >
      {/* Block Header */}
      <div className="block-header">
        <div className="block-index">
          <span className="block-number">#{block.index}</span>
          <span className="block-type" style={{ color: typeColors[block.type] }}>
            {typeLabels[block.type]}
          </span>
        </div>
        <div className="block-status">
          {block.confirmed ? (
            <span className="confirmed">✓ CONFIRMED</span>
          ) : (
            <span className="pending">◉ PENDING</span>
          )}
        </div>
      </div>

      {/* Block Content */}
      <div className="block-content">
        <h2 className="block-title">{block.title}</h2>
        <h3 className="block-company">{block.company}</h3>
        <div className="block-timestamp">
          <span className="timestamp-icon">⏱</span>
          <span>{block.timestamp.start} → {block.timestamp.end || 'Present'}</span>
        </div>
        <p className="block-description">{block.description}</p>
      </div>

      {/* Transactions (Skills) */}
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

      {/* Block Footer - Hash */}
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
