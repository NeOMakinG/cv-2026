import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import type { Block } from '../types/blockchain';
import './BlockCard.css';

interface BlockCardProps {
  block: Block;
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

export const BlockCard = ({ block, displayIndex }: BlockCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hashRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const isVisibleRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [displayHash, setDisplayHash] = useState(block.hash);

  const startHashInterval = useCallback(() => {
    if (intervalRef.current || block.confirmed) return;
    intervalRef.current = setInterval(() => {
      const chars = '0123456789abcdef';
      const newHash = '0x' + Array.from({ length: 64 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      setDisplayHash(newHash);
    }, 250);
  }, [block.confirmed]);

  const stopHashInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopHashInterval();
  }, [stopHashInterval]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          el.classList.add('active');
          if (!block.confirmed) startHashInterval();
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            const svgs = el.querySelectorAll('.block-bg-svg');
            svgs.forEach((svg) => {
              gsap.fromTo(svg,
                { opacity: 0, scale: 0.92 },
                { opacity: 0.4, scale: 1, duration: 1.2, ease: 'power2.out' }
              );
            });
          }
        } else {
          el.classList.remove('active');
          stopHashInterval();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [block.confirmed, startHashInterval, stopHashInterval]);

  const [r1, r2] = ROTATION_PAIRS[displayIndex % ROTATION_PAIRS.length];

  return (
    <div 
      ref={cardRef}
      className={`block-card ${!block.confirmed ? 'mining' : ''}`}
    >
      <img
        src="/block-1.png"
        className="block-bg-svg block-bg-svg-1"
        style={{ '--base-rotation': `${r1}deg` } as React.CSSProperties}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/block-2.png"
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
