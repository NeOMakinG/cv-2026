/**
 * @fileoverview Journey data - Your story on the globe.
 * 
 * CUSTOMIZE THIS FILE with your own milestones!
 * Each milestone represents a significant point in your journey
 * that will be displayed on the interactive 3D globe.
 */

import type { JourneyMilestone, StorySection } from '../types';
import { COLORS } from '../constants/config';

/**
 * Your journey milestones.
 * 
 * Tips for great milestones:
 * - Be specific with dates and locations
 * - Highlight technologies that showcase your growth
 * - Write descriptions that tell a story, not just list duties
 * - Order them chronologically for the best narrative flow
 */
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'origin',
    title: 'Where It All Began',
    location: 'Your Hometown, Country',
    coordinates: { lat: 48.8566, lng: 2.3522 }, // Example: Paris
    startDate: '1995',
    endDate: null,
    description: 'Born and raised here. First lines of code written at age 12. Built my first website with HTML tables and inline styles. The rest is history.',
    type: 'origin',
    color: COLORS.MARKERS.origin,
  },
  {
    id: 'education-1',
    title: 'Computer Science Degree',
    location: 'University City, Country',
    coordinates: { lat: 45.7640, lng: 4.8357 }, // Example: Lyon
    startDate: '2015',
    endDate: '2018',
    description: 'Studied algorithms, data structures, and fell in love with web development. Built countless projects, broke production twice, learned from every mistake.',
    type: 'education',
    technologies: ['Java', 'Python', 'SQL', 'Linux'],
    color: COLORS.MARKERS.education,
  },
  {
    id: 'work-1',
    title: 'Junior Developer',
    location: 'First Job City, Country',
    coordinates: { lat: 43.2965, lng: 5.3698 }, // Example: Marseille
    startDate: '2018',
    endDate: '2020',
    description: 'First real job. Learned that code in production is different from code in tutorials. Grew from "it works on my machine" to "let me check the logs."',
    type: 'work',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    url: 'https://example.com',
    color: COLORS.MARKERS.work,
  },
  {
    id: 'work-2',
    title: 'Frontend Developer',
    location: 'Growth City, Country',
    coordinates: { lat: 52.5200, lng: 13.4050 }, // Example: Berlin
    startDate: '2020',
    endDate: '2022',
    description: 'Leveled up. Led frontend architecture decisions. Mentored juniors. Learned that the best code is the code you don\'t have to write.',
    type: 'work',
    technologies: ['TypeScript', 'React', 'GraphQL', 'AWS'],
    url: 'https://example.com',
    color: COLORS.MARKERS.work,
  },
  {
    id: 'project-1',
    title: 'Open Source Project',
    location: 'Remote / Worldwide',
    coordinates: { lat: 37.7749, lng: -122.4194 }, // Example: San Francisco (GitHub HQ)
    startDate: '2021',
    endDate: null,
    description: 'Built an open source tool that helps developers. 2k+ GitHub stars. Learned that documentation is as important as code.',
    type: 'project',
    technologies: ['TypeScript', 'Rust', 'WebAssembly'],
    url: 'https://github.com/yourusername/project',
    color: COLORS.MARKERS.project,
  },
  {
    id: 'current',
    title: 'Senior Developer',
    location: 'Current City, Country',
    coordinates: { lat: 33.5731, lng: -7.5898 }, // Example: Casablanca
    startDate: '2022',
    endDate: null,
    description: 'Current chapter. Building products that matter. Leading teams. Still learning every day. The journey continues...',
    type: 'current',
    technologies: ['React', 'TypeScript', 'Three.js', 'Node.js', 'AWS'],
    color: COLORS.MARKERS.current,
  },
];

/**
 * Story sections for scroll-based narrative.
 * These control the flow of the storytelling experience.
 */
export const STORY_SECTIONS: StorySection[] = [
  {
    id: 'intro',
    title: 'The Journey',
    subtitle: 'A developer\'s path across the globe',
    milestoneIds: [],
  },
  {
    id: 'origins',
    title: 'Origins',
    subtitle: 'Where the story begins',
    milestoneIds: ['origin'],
  },
  {
    id: 'learning',
    title: 'Learning',
    subtitle: 'Building the foundation',
    milestoneIds: ['education-1'],
  },
  {
    id: 'growth',
    title: 'Growth',
    subtitle: 'From junior to senior',
    milestoneIds: ['work-1', 'work-2'],
  },
  {
    id: 'impact',
    title: 'Impact',
    subtitle: 'Giving back to the community',
    milestoneIds: ['project-1'],
  },
  {
    id: 'present',
    title: 'Present',
    subtitle: 'The current chapter',
    milestoneIds: ['current'],
  },
];

/**
 * Helper function to find a milestone by ID.
 */
export const getMilestoneById = (id: string): JourneyMilestone | undefined => {
  return JOURNEY_MILESTONES.find((m) => m.id === id);
};

/**
 * Helper function to get milestones for a section.
 */
export const getMilestonesForSection = (sectionId: string): JourneyMilestone[] => {
  const section = STORY_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  
  return section.milestoneIds
    .map(getMilestoneById)
    .filter((m): m is JourneyMilestone => m !== undefined);
};
