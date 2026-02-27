/**
 * @fileoverview Flight path arc between two points on the globe.
 * Creates animated curved lines connecting journey milestones.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { GLOBE_CONFIG, COLORS } from '../../constants/config';
import { latLngToVector3 } from '../../utils/coordinates';
import type { Coordinates } from '../../types';

interface FlightPathProps {
  /** Starting coordinates */
  start: Coordinates;
  /** Ending coordinates */
  end: Coordinates;
  /** Arc height multiplier (1 = globe radius) */
  arcHeight?: number;
  /** Line color */
  color?: string;
  /** Whether to animate the path */
  animated?: boolean;
  /** Animation speed (0-1) */
  animationProgress?: number;
}

/**
 * Animated arc between two points on the globe.
 * 
 * Creates a great-circle-like path with adjustable height,
 * perfect for showing the journey between milestones.
 * 
 * @example
 * ```tsx
 * <FlightPath
 *   start={{ lat: 48.8566, lng: 2.3522 }}
 *   end={{ lat: 52.5200, lng: 13.4050 }}
 *   animated
 * />
 * ```
 */
export const FlightPath: React.FC<FlightPathProps> = ({
  start,
  end,
  arcHeight = 0.3,
  color = COLORS.PRIMARY,
  animated = true,
  animationProgress,
}) => {
  const progressRef = useRef(0);

  /**
   * Generate the curved path between two points.
   * Uses quadratic Bezier curve with midpoint elevated above the globe.
   */
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...latLngToVector3(start));
    const endVec = new THREE.Vector3(...latLngToVector3(end));

    // Calculate midpoint and elevate it
    const midPoint = new THREE.Vector3()
      .addVectors(startVec, endVec)
      .multiplyScalar(0.5);
    
    // Elevate midpoint based on distance and arcHeight
    const distance = startVec.distanceTo(endVec);
    const elevation = GLOBE_CONFIG.RADIUS + distance * arcHeight;
    midPoint.normalize().multiplyScalar(elevation);

    // Create quadratic Bezier curve
    return new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
  }, [start, end, arcHeight]);

  /**
   * Generate points along the curve.
   */
  const points = useMemo(() => {
    return curve.getPoints(64);
  }, [curve]);

  /**
   * Get visible points based on animation progress.
   */
  const visiblePoints = useMemo(() => {
    const targetProgress = animationProgress ?? progressRef.current;
    const count = Math.floor(targetProgress * points.length);
    return points.slice(0, Math.max(count, 2));
  }, [points, animationProgress]);

  /**
   * Animation loop for drawing the path.
   */
  useFrame((_, delta) => {
    if (!animated || animationProgress !== undefined) return;

    // Animate internally if no external progress
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, 1, delta * 2);
  });

  return (
    <Line
      points={visiblePoints}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};

/**
 * Component to render all flight paths between consecutive milestones.
 */
interface FlightPathsProps {
  /** Array of coordinates in order */
  coordinates: Coordinates[];
  /** Whether to show all paths or animate sequentially */
  showAll?: boolean;
  /** Current milestone index for sequential animation */
  currentIndex?: number;
}

export const FlightPaths: React.FC<FlightPathsProps> = ({
  coordinates,
  showAll = true,
  currentIndex = -1,
}) => {
  const paths = useMemo(() => {
    const result: { start: Coordinates; end: Coordinates; index: number }[] = [];
    
    for (let i = 0; i < coordinates.length - 1; i++) {
      result.push({
        start: coordinates[i],
        end: coordinates[i + 1],
        index: i,
      });
    }
    
    return result;
  }, [coordinates]);

  return (
    <group>
      {paths.map((path, index) => {
        // Determine if this path should be visible
        const isVisible = showAll || index <= currentIndex;
        const isAnimating = !showAll && index === currentIndex;

        if (!isVisible) return null;

        return (
          <FlightPath
            key={`path-${index}`}
            start={path.start}
            end={path.end}
            animated={isAnimating}
            animationProgress={isAnimating ? undefined : 1}
          />
        );
      })}
    </group>
  );
};

export default FlightPath;
