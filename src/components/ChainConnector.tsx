import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChainConnector.css';

interface ChainConnectorProps {
  isAnimating: boolean;
  confirmed: boolean;
}

export const ChainConnector = ({ isAnimating, confirmed }: ChainConnectorProps) => {
  const connectorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating && connectorRef.current) {
      gsap.fromTo(connectorRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [isAnimating]);

  useEffect(() => {
    if (particlesRef.current && confirmed) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -60,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          delay: i * 0.3,
          ease: 'power1.out',
        });
      });
    }
  }, [confirmed]);

  return (
    <div className="chain-connector" ref={connectorRef}>
      <div className="chain-line">
        <div className="chain-glow" />
      </div>
      <div className="chain-links">
        <div className="link" />
        <div className="link" />
        <div className="link" />
      </div>
      {confirmed && (
        <div className="particles" ref={particlesRef}>
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      )}
    </div>
  );
};
