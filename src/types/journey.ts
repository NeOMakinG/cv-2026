/**
 * @fileoverview Type definitions for the journey/CV data structure.
 * These types define the shape of all location-based milestones
 * that will be displayed on the 3D globe.
 */

/**
 * Geographic coordinates for a location on the globe.
 * Uses standard latitude/longitude format.
 */
export interface Coordinates {
  /** Latitude in degrees (-90 to 90) */
  lat: number;
  /** Longitude in degrees (-180 to 180) */
  lng: number;
}

/**
 * Represents a single milestone/location in the journey.
 * Each milestone will be rendered as a marker on the globe
 * with associated metadata for the detail view.
 */
export interface JourneyMilestone {
  /** Unique identifier for the milestone */
  id: string;
  /** Display title (e.g., "Senior Developer at Company X") */
  title: string;
  /** Location name (e.g., "Paris, France") */
  location: string;
  /** Geographic coordinates for globe positioning */
  coordinates: Coordinates;
  /** Start date of this milestone */
  startDate: string;
  /** End date (null if current/ongoing) */
  endDate: string | null;
  /** Detailed description of the role/experience */
  description: string;
  /** Type of milestone for styling/filtering */
  type: MilestoneType;
  /** Technologies/skills associated with this milestone */
  technologies?: string[];
  /** URL to company/project website */
  url?: string;
  /** Hex color for the marker */
  color?: string;
}

/**
 * Categories of milestones for visual differentiation
 * and potential filtering functionality.
 */
export type MilestoneType = 
  | 'origin'      // Birthplace/hometown
  | 'education'   // Schools, bootcamps, certifications
  | 'work'        // Professional experience
  | 'project'     // Notable side projects
  | 'current';    // Current position/location

/**
 * Camera animation state for smooth transitions
 * between globe positions.
 */
export interface CameraState {
  /** Target position to look at [x, y, z] */
  target: [number, number, number];
  /** Camera position [x, y, z] */
  position: [number, number, number];
  /** Field of view in degrees */
  fov: number;
}

/**
 * Section data for scroll-based storytelling.
 * Each section corresponds to a part of the narrative.
 */
export interface StorySection {
  /** Unique section identifier */
  id: string;
  /** Section title */
  title: string;
  /** Section subtitle/tagline */
  subtitle?: string;
  /** Array of milestone IDs to highlight in this section */
  milestoneIds: string[];
  /** Background color/gradient for this section */
  background?: string;
}
