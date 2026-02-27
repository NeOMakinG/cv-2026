/**
 * @fileoverview Milestone information card component.
 * Displays detailed information about the currently selected milestone.
 */

import { useMemo } from 'react';
import type { JourneyMilestone } from '../../types';
import './MilestoneCard.css';

interface MilestoneCardProps {
  /** Milestone data to display */
  milestone: JourneyMilestone | null;
  /** Whether the card is visible */
  isVisible?: boolean;
  /** Close button callback */
  onClose?: () => void;
}

/**
 * Card component showing milestone details.
 * 
 * Displays:
 * - Title and location
 * - Date range
 * - Description
 * - Technologies/skills
 * - External link (if available)
 * 
 * @example
 * ```tsx
 * <MilestoneCard
 *   milestone={selectedMilestone}
 *   isVisible={!!selectedMilestone}
 *   onClose={() => setSelectedMilestone(null)}
 * />
 * ```
 */
export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  isVisible = true,
  onClose,
}) => {
  /**
   * Format the date range for display.
   */
  const dateRange = useMemo(() => {
    if (!milestone) return '';
    
    const start = milestone.startDate;
    const end = milestone.endDate ?? 'Present';
    
    return `${start} — ${end}`;
  }, [milestone]);

  /**
   * Determine badge color based on milestone type.
   */
  const typeLabel = useMemo(() => {
    if (!milestone) return '';
    
    const labels: Record<string, string> = {
      origin: '🏠 Origin',
      education: '🎓 Education',
      work: '💼 Work',
      project: '🚀 Project',
      current: '📍 Current',
    };
    
    return labels[milestone.type] || milestone.type;
  }, [milestone]);

  if (!milestone || !isVisible) {
    return null;
  }

  return (
    <article 
      className="milestone-card"
      style={{ '--accent-color': milestone.color } as React.CSSProperties}
    >
      {/* Close button */}
      <button 
        className="milestone-card__close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Header */}
      <header className="milestone-card__header">
        <span className="milestone-card__type">{typeLabel}</span>
        <h2 className="milestone-card__title">{milestone.title}</h2>
        <p className="milestone-card__location">{milestone.location}</p>
        <time className="milestone-card__date">{dateRange}</time>
      </header>

      {/* Description */}
      <div className="milestone-card__body">
        <p className="milestone-card__description">{milestone.description}</p>
      </div>

      {/* Technologies */}
      {milestone.technologies && milestone.technologies.length > 0 && (
        <footer className="milestone-card__footer">
          <h3 className="milestone-card__tech-label">Technologies</h3>
          <ul className="milestone-card__tech-list">
            {milestone.technologies.map((tech) => (
              <li key={tech} className="milestone-card__tech-item">
                {tech}
              </li>
            ))}
          </ul>
        </footer>
      )}

      {/* External link */}
      {milestone.url && (
        <a
          href={milestone.url}
          target="_blank"
          rel="noopener noreferrer"
          className="milestone-card__link"
        >
          Learn more →
        </a>
      )}
    </article>
  );
};

export default MilestoneCard;
