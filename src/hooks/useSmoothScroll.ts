/**
 * @fileoverview Hook for smooth scroll functionality using Lenis.
 * Provides buttery smooth scrolling experience and scroll progress tracking.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

interface UseSmoothScrollOptions {
  /** Smoothing factor (0-1, lower = smoother) */
  lerp?: number;
  /** Duration of scroll animations */
  duration?: number;
  /** Scroll orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Whether smooth scroll is enabled */
  enabled?: boolean;
}

interface UseSmoothScrollReturn {
  /** Lenis instance for direct access */
  lenis: Lenis | null;
  /** Current scroll progress (0-1) */
  scrollProgress: number;
  /** Current scroll position in pixels */
  scrollPosition: number;
  /** Scroll to a specific position or element */
  scrollTo: (target: number | string | HTMLElement) => void;
  /** Stop the scroll animation */
  stop: () => void;
  /** Resume scroll animation */
  start: () => void;
}

/**
 * Hook for implementing smooth scroll with Lenis.
 * Provides scroll progress tracking useful for scroll-based animations.
 * 
 * @example
 * ```tsx
 * const { scrollProgress, scrollTo } = useSmoothScroll();
 * 
 * // Use scrollProgress for animations
 * const opacity = 1 - scrollProgress;
 * 
 * // Scroll to section
 * scrollTo('#about-section');
 * ```
 */
export const useSmoothScroll = (
  options: UseSmoothScrollOptions = {}
): UseSmoothScrollReturn => {
  const {
    lerp = 0.1,
    duration = 1.2,
    orientation = 'vertical',
    enabled = true,
  } = options;

  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  /**
   * Initialize Lenis and set up scroll listeners.
   */
  useEffect(() => {
    if (!enabled) return;

    // Create Lenis instance
    const lenis = new Lenis({
      lerp,
      duration,
      orientation,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Scroll event handler
    const onScroll = ({ scroll, progress }: { 
      scroll: number; 
      limit: number; 
      progress: number;
    }) => {
      setScrollProgress(progress);
      setScrollPosition(scroll);
    };

    lenis.on('scroll', onScroll);

    // Animation frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp, duration, orientation, enabled]);

  /**
   * Scroll to a target position or element.
   */
  const scrollTo = useCallback((target: number | string | HTMLElement) => {
    lenisRef.current?.scrollTo(target, {
      duration: duration,
    });
  }, [duration]);

  /**
   * Stop scroll animation.
   */
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  /**
   * Start/resume scroll animation.
   */
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return {
    lenis: lenisRef.current,
    scrollProgress,
    scrollPosition,
    scrollTo,
    stop,
    start,
  };
};

export type { UseSmoothScrollOptions, UseSmoothScrollReturn };
