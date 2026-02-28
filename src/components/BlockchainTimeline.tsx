import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail, HiOutlineDocumentDownload } from 'react-icons/hi';
import { BlockCard } from './BlockCard';
import { ChainConnector } from './ChainConnector';
import { ChainModal } from './ChainModal';
import { BLOCKS, CAREER_CHAIN } from '../data/chain';
import { CHAIN_DECORATIONS, getChainById } from '../data/chains';
import type { ChainExperience } from '../data/chains';
import './BlockchainTimeline.css';

export const BlockchainTimeline = () => {
  const reversedBlocks = useMemo(() => [...BLOCKS].reverse(), []);
  const [selectedChain, setSelectedChain] = useState<ChainExperience | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const paginationRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);

  const totalSections = reversedBlocks.length + 2;

  const updatePaginationDots = useCallback((newIndex: number) => {
    if (!paginationRef.current || activeIndexRef.current === newIndex) return;
    const dots = paginationRef.current.children;
    const prev = dots[activeIndexRef.current] as HTMLElement | undefined;
    const next = dots[newIndex] as HTMLElement | undefined;
    if (prev) prev.classList.remove('dot-active');
    if (next) next.classList.add('dot-active');
    activeIndexRef.current = newIndex;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-section-index'));
            if (!isNaN(index)) updatePaginationDots(index);
          }
        }
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reversedBlocks.length, updatePaginationDots]);

  const scrollToSection = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="blockchain-timeline">
      <nav
        className="block-pagination"
        aria-label="Block navigation"
        ref={paginationRef}
      >
        {Array.from({ length: totalSections }, (_, i) => {
          let dotClass = 'pagination-dot';
          let label = '';

          if (i === 0) {
            dotClass += ' dot-header dot-active';
            label = '0xm4king';
          } else if (i === totalSections - 1) {
            dotClass += ' dot-footer';
            label = 'EOF';
          } else {
            const block = reversedBlocks[i - 1];
            if (block) {
              dotClass += block.confirmed ? ' dot-confirmed' : ' dot-mining';
              label = block.company;
            }
          }

          return (
            <button
              key={i}
              className={dotClass}
              onClick={() => scrollToSection(i)}
              aria-label={label}
            >
              <span className="pagination-label">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Header */}
      <header
        className="timeline-header"
        data-section-index={0}
        ref={el => { if (el) sectionRefs.current[0] = el; }}
      >
        {CHAIN_DECORATIONS.map((deco) => {
          const chain = getChainById(deco.chainId);
          if (!chain) return null;
          return (
            <button
              key={deco.chainId}
              className="chain-logo-decoration"
              onClick={() => setSelectedChain(chain)}
              aria-label={`Learn about ${chain.name}`}
              style={{
                top: deco.top,
                left: deco.left,
                right: deco.right,
                width: `${deco.size}px`,
                height: `${deco.size}px`,
                opacity: deco.opacity,
                '--deco-rotation': `${deco.rotation}deg`,
                '--deco-duration': `${deco.duration}s`,
              } as React.CSSProperties}
            >
              <img src={chain.icon} alt="" className="chain-logo-img" />
            </button>
          );
        })}
        <div className="header-content">
          <h1 className="glitch" data-text="0xm4king">0xm4king</h1>
          <p className="subtitle">Engineer &bull; Web3 &bull; DeFi</p>
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
          <div className="header-links">
            <a href="https://github.com/neomaking" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://x.com/0xm4king" target="_blank" rel="noopener noreferrer">
              <FaXTwitter /> X
            </a>
            <a href="mailto:contact@0xm4king.com">
              <HiOutlineMail /> contact@0xm4king.com
            </a>
            <a href="/cv" className="header-cv-link">
              <HiOutlineDocumentDownload /> Download CV
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to mine</span>
          <div className="scroll-arrow">&darr;</div>
        </div>
      </header>

      {/* Blockchain */}
      <div className="chain-container">
        {reversedBlocks.map((block, index) => (
          <div
            key={block.id}
            className="block-section"
            data-section-index={index + 1}
            ref={el => { if (el) sectionRefs.current[index + 1] = el; }}
          >
            <div className="block-wrapper">
              <BlockCard
                block={block}
                displayIndex={index}
              />
            </div>
            {index < reversedBlocks.length - 1 && <ChainConnector />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className="timeline-footer"
        data-section-index={totalSections - 1}
        ref={el => { if (el) sectionRefs.current[totalSections - 1] = el; }}
      >
        <div className="footer-content">
          <p className="footer-hash">
            Chain validated &bull; {BLOCKS.length} blocks confirmed
          </p>
          <div className="footer-links">
            <a href="https://github.com/neomaking" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://x.com/0xm4king" target="_blank" rel="noopener noreferrer">
              <FaXTwitter /> X
            </a>
            <a href="mailto:contact@0xm4king.com">
              <HiOutlineMail /> contact@0xm4king.com
            </a>
            <a href="/cv" className="footer-cv-link">
              <HiOutlineDocumentDownload /> Download CV
            </a>
          </div>
        </div>
      </footer>

      <ChainModal chain={selectedChain} onClose={() => setSelectedChain(null)} />
    </div>
  );
};
