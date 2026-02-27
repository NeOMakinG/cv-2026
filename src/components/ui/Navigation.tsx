/**
 * @fileoverview Navigation controls for journey milestones.
 * Provides buttons and progress indicator for navigating the timeline.
 */

import type { JourneyMilestone } from '../../types';
import { JOURNEY_MILESTONES } from '../../data/journey';
import './Navigation.css';

interface NavigationProps {
  /** Current milestone index (-1 for overview) */
  currentIndex: number;
  /** Navigate to next milestone */
  onNext: () => void;
  /** Navigate to previous milestone */
  onPrevious: () => void;
  /** Navigate to specific milestone */
  onSelectMilestone: (id: string) => void;
  /** Whether navigation is disabled (during transitions) */
  disabled?: boolean;
}

/**
 * Navigation component for journey timeline.
 * 
 * Features:
 * - Previous/Next buttons
 * - Milestone dot indicators
 * - Progress bar
 * - Keyboard navigation support
 * 
 * @example
 * ```tsx
 * <Navigation
 *   currentIndex={index}
 *   onNext={goToNext}
 *   onPrevious={goToPrevious}
 *   onSelectMilestone={goToMilestone}
 * />
 * ```
 */
export const Navigation: React.FC<NavigationProps> = ({
  currentIndex,
  onNext,
  onPrevious,
  onSelectMilestone,
  disabled = false,
}) => {
  const totalMilestones = JOURNEY_MILESTONES.length;
  const progress = currentIndex >= 0 
    ? ((currentIndex + 1) / totalMilestones) * 100 
    : 0;

  /**
   * Handle keyboard navigation.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
    }
  };

  return (
    <nav 
      className="navigation"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Journey navigation"
    >
      {/* Progress bar */}
      <div className="navigation__progress">
        <div 
          className="navigation__progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Milestone dots */}
      <div className="navigation__dots">
        {JOURNEY_MILESTONES.map((milestone, index) => (
          <button
            key={milestone.id}
            className={`navigation__dot ${
              index === currentIndex ? 'navigation__dot--active' : ''
            } ${index < currentIndex ? 'navigation__dot--completed' : ''}`}
            onClick={() => onSelectMilestone(milestone.id)}
            disabled={disabled}
            aria-label={`Go to ${milestone.title}`}
            aria-current={index === currentIndex ? 'step' : undefined}
            style={{ '--dot-color': milestone.color } as React.CSSProperties}
          >
            <span className="navigation__dot-tooltip">{milestone.title}</span>
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="navigation__buttons">
        <button
          className="navigation__button navigation__button--prev"
          onClick={onPrevious}
          disabled={disabled || currentIndex <= -1}
          aria-label="Previous milestone"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Previous</span>
        </button>

        <span className="navigation__counter">
          {currentIndex >= 0 ? currentIndex + 1 : 0} / {totalMilestones}
        </span>

        <button
          className="navigation__button navigation__button--next"
          onClick={onNext}
          disabled={disabled || currentIndex >= totalMilestones - 1}
          aria-label="Next milestone"
        >
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
