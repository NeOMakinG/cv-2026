/**
 * @fileoverview Application configuration constants.
 * Centralizes all magic numbers and configuration values
 * for easy tweaking and maintenance.
 */

/**
 * Globe rendering configuration.
 * These values control the appearance and behavior of the 3D Earth.
 */
export const GLOBE_CONFIG = {
  /** Radius of the globe in Three.js units */
  RADIUS: 1,
  /** Number of width segments for sphere geometry (higher = smoother) */
  WIDTH_SEGMENTS: 64,
  /** Number of height segments for sphere geometry */
  HEIGHT_SEGMENTS: 64,
  /** Rotation speed in radians per frame (when idle) */
  ROTATION_SPEED: 0.001,
  /** Initial camera distance from globe center */
  CAMERA_DISTANCE: 2.5,
  /** Minimum zoom distance */
  MIN_ZOOM: 1.5,
  /** Maximum zoom distance */
  MAX_ZOOM: 4,
} as const;

/**
 * Marker configuration for journey points.
 */
export const MARKER_CONFIG = {
  /** Base size of markers */
  SIZE: 0.02,
  /** Hover scale multiplier */
  HOVER_SCALE: 1.5,
  /** Pulse animation duration in seconds */
  PULSE_DURATION: 2,
  /** Height of marker above globe surface */
  ELEVATION: 0.01,
} as const;

/**
 * Animation timing configuration.
 */
export const ANIMATION_CONFIG = {
  /** Duration for camera transitions in seconds */
  CAMERA_TRANSITION: 1.5,
  /** Easing function for camera movements */
  CAMERA_EASING: 'power2.inOut',
  /** Delay between auto-play transitions */
  AUTO_PLAY_DELAY: 5,
  /** Duration for marker entrance animations */
  MARKER_ENTRANCE: 0.8,
} as const;

/**
 * Color palette for the application.
 * Using CSS custom properties format for easy theming.
 */
export const COLORS = {
  /** Primary accent color */
  PRIMARY: '#6366f1',
  /** Secondary accent color */
  SECONDARY: '#8b5cf6',
  /** Background color */
  BACKGROUND: '#0a0a0f',
  /** Text color */
  TEXT: '#ffffff',
  /** Muted text color */
  TEXT_MUTED: '#94a3b8',
  /** Globe atmosphere color */
  ATMOSPHERE: '#3b82f6',
  /** Marker colors by type */
  MARKERS: {
    origin: '#22c55e',
    education: '#3b82f6',
    work: '#8b5cf6',
    project: '#f59e0b',
    current: '#ef4444',
  },
} as const;

/**
 * Breakpoints for responsive design.
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
