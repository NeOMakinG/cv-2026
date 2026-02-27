import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlockCard } from './BlockCard';
import { ChainConnector } from './ChainConnector';
import { BLOCKS, CAREER_CHAIN } from '../data/chain';
import './BlockchainTimeline.css';

gsap.registerPlugin(ScrollTrigger);

export const BlockchainTimeline = () => {
  const [activeBlock, setActiveBlock] = useState(0);
  const [minedBlocks, setMinedBlocks] = useState<number[]>([0]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate blocks appearing as you scroll
    blocksRef.current.forEach((block, index) => {
      if (block) {
        gsap.fromTo(block,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9 
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                if (!minedBlocks.includes(index)) {
                  setMinedBlocks(prev => [...prev, index]);
                }
              },
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="blockchain-timeline" ref={timelineRef}>
      {/* Header */}
      <header className="timeline-header">
        <div className="header-content">
          <h1 className="glitch" data-text="0xm4king">0xm4king</h1>
          <p className="subtitle">Frontend Engineer • Web3 • DeFi</p>
          <div className="chain-stats">
            <div className="stat">
              <span className="stat-value">{CAREER_CHAIN.totalBlocks}</span>
              <span className="stat-label">BLOCKS</span>
            </div>
            <div className="stat">
              <span className="stat-value">{BLOCKS.filter(b => b.confirmed).length}</span>
              <span className="stat-label">CONFIRMED</span>
            </div>
            <div className="stat">
              <span className="stat-value">10+</span>
              <span className="stat-label">YEARS</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to mine</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </header>

      {/* Blockchain */}
      <div className="chain-container">
        {BLOCKS.map((block, index) => (
          <div 
            key={block.id} 
            className="block-wrapper"
            ref={el => { if (el) blocksRef.current[index] = el; }}
          >
            <BlockCard
              block={block}
              isActive={activeBlock === index}
              onActivate={() => setActiveBlock(index)}
            />
            {index < BLOCKS.length - 1 && (
              <ChainConnector 
                isAnimating={minedBlocks.includes(index + 1)}
                confirmed={BLOCKS[index + 1].confirmed}
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="timeline-footer">
        <div className="footer-content">
          <p className="footer-hash">
            Chain validated • {BLOCKS.filter(b => b.confirmed).length} blocks confirmed
          </p>
          <div className="footer-links">
            <a href="https://github.com/neomaking" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/🚀-valentin-szczupak-0280aba1" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://shapeshift.com" target="_blank" rel="noopener noreferrer">
              ShapeShift
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
