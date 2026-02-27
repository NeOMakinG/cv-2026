/**
 * @fileoverview Hook for managing journey navigation state.
 * Handles the current milestone, transitions, and navigation controls.
 */

import { useState, useCallback, useMemo } from 'react';
import { JOURNEY_MILESTONES } from '../data/journey';
import type { JourneyMilestone } from '../types';

interface UseJourneyNavigationReturn {
  /** Currently active milestone */
  currentMilestone: JourneyMilestone | null;
  /** Index of current milestone in the array */
  currentIndex: number;
  /** Navigate to the next milestone */
  goToNext: () => void;
  /** Navigate to the previous milestone */
  goToPrevious: () => void;
  /** Navigate to a specific milestone by ID */
  goToMilestone: (id: string) => void;
  /** Navigate to a specific index */
  goToIndex: (index: number) => void;
  /** Whether there's a next milestone */
  hasNext: boolean;
  /** Whether there's a previous milestone */
  hasPrevious: boolean;
  /** Total number of milestones */
  totalMilestones: number;
  /** Whether currently animating between milestones */
  isTransitioning: boolean;
  /** Set transitioning state */
  setIsTransitioning: (value: boolean) => void;
}

/**
 * Hook for managing navigation through journey milestones.
 * Provides controls for moving between points on the globe.
 * 
 * @example
 * ```tsx
 * const { currentMilestone, goToNext, goToPrevious } = useJourneyNavigation();
 * 
 * return (
 *   <div>
 *     <h1>{currentMilestone?.title}</h1>
 *     <button onClick={goToPrevious}>Previous</button>
 *     <button onClick={goToNext}>Next</button>
 *   </div>
 * );
 * ```
 */
export const useJourneyNavigation = (): UseJourneyNavigationReturn => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  /**
   * Get the current milestone based on index.
   * Returns null when index is -1 (initial state / overview).
   */
  const currentMilestone = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= JOURNEY_MILESTONES.length) {
      return null;
    }
    return JOURNEY_MILESTONES[currentIndex];
  }, [currentIndex]);

  /**
   * Navigation state helpers.
   */
  const hasNext = currentIndex < JOURNEY_MILESTONES.length - 1;
  const hasPrevious = currentIndex > -1;
  const totalMilestones = JOURNEY_MILESTONES.length;

  /**
   * Navigate to the next milestone.
   * Wraps around to start if at the end.
   */
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setCurrentIndex((prev) => {
      if (prev >= JOURNEY_MILESTONES.length - 1) {
        return prev; // Stay at last milestone
      }
      return prev + 1;
    });
  }, [isTransitioning]);

  /**
   * Navigate to the previous milestone.
   * Goes to overview state (-1) if at the first milestone.
   */
  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    
    setCurrentIndex((prev) => {
      if (prev <= -1) {
        return prev; // Stay at overview
      }
      return prev - 1;
    });
  }, [isTransitioning]);

  /**
   * Navigate to a specific milestone by ID.
   */
  const goToMilestone = useCallback((id: string) => {
    if (isTransitioning) return;
    
    const index = JOURNEY_MILESTONES.findIndex((m) => m.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [isTransitioning]);

  /**
   * Navigate to a specific index.
   * Use -1 to return to overview state.
   */
  const goToIndex = useCallback((index: number) => {
    if (isTransitioning) return;
    
    if (index >= -1 && index < JOURNEY_MILESTONES.length) {
      setCurrentIndex(index);
    }
  }, [isTransitioning]);

  return {
    currentMilestone,
    currentIndex,
    goToNext,
    goToPrevious,
    goToMilestone,
    goToIndex,
    hasNext,
    hasPrevious,
    totalMilestones,
    isTransitioning,
    setIsTransitioning,
  };
};

export type { UseJourneyNavigationReturn };
