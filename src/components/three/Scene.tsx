/**
 * @fileoverview Main 3D scene composition.
 * Assembles all Three.js components into a cohesive scene.
 */

import { Suspense, useMemo } from 'react';
import { Environment, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Globe } from './Globe';
import { Marker } from './Marker';
import { CameraController } from './CameraController';
import { FlightPaths } from './FlightPath';
import { JOURNEY_MILESTONES } from '../../data/journey';
import type { JourneyMilestone } from '../../types';

interface SceneProps {
  /** Currently focused milestone */
  currentMilestone: JourneyMilestone | null;
  /** Callback when a marker is clicked */
  onMarkerClick?: (milestone: JourneyMilestone) => void;
  /** Callback when camera transition completes */
  onTransitionComplete?: () => void;
  /** Callback when camera transition starts */
  onTransitionStart?: () => void;
  /** Whether to show flight paths */
  showFlightPaths?: boolean;
  /** Whether globe should auto-rotate */
  autoRotate?: boolean;
}

/**
 * Main 3D scene component.
 * 
 * Composes all scene elements:
 * - Globe with atmosphere
 * - Journey markers
 * - Flight paths between milestones
 * - Camera controls
 * - Lighting and environment
 * - Post-processing effects
 * 
 * @example
 * ```tsx
 * <Canvas>
 *   <Scene
 *     currentMilestone={activeMilestone}
 *     onMarkerClick={handleMarkerSelect}
 *   />
 * </Canvas>
 * ```
 */
export const Scene: React.FC<SceneProps> = ({
  currentMilestone,
  onMarkerClick,
  onTransitionComplete,
  onTransitionStart,
  showFlightPaths = true,
  autoRotate = true,
}) => {
  /**
   * Extract coordinates from all milestones for flight paths.
   */
  const coordinates = useMemo(() => {
    return JOURNEY_MILESTONES.map((m) => m.coordinates);
  }, []);

  /**
   * Current milestone index for flight path animation.
   */
  const currentIndex = useMemo(() => {
    if (!currentMilestone) return -1;
    return JOURNEY_MILESTONES.findIndex((m) => m.id === currentMilestone.id);
  }, [currentMilestone]);

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main globe with markers */}
      <Suspense fallback={null}>
        <Float
          speed={0.5}
          rotationIntensity={0.2}
          floatIntensity={0.1}
          floatingRange={[-0.02, 0.02]}
        >
          <Globe autoRotate={autoRotate && !currentMilestone} />

          {/* Journey markers */}
          {JOURNEY_MILESTONES.map((milestone) => (
            <Marker
              key={milestone.id}
              milestone={milestone}
              isActive={currentMilestone?.id === milestone.id}
              onClick={onMarkerClick}
            />
          ))}

          {/* Flight paths */}
          {showFlightPaths && (
            <FlightPaths
              coordinates={coordinates}
              showAll={!currentMilestone}
              currentIndex={currentIndex}
            />
          )}
        </Float>
      </Suspense>

      {/* Camera controller */}
      <CameraController
        targetMilestone={currentMilestone}
        onTransitionComplete={onTransitionComplete}
        onTransitionStart={onTransitionStart}
        enableControls={!currentMilestone}
      />

      {/* Environment map for reflections */}
      <Environment preset="night" />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
};

export default Scene;
