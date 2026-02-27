/**
 * @fileoverview Main globe canvas wrapper component.
 * Sets up the React Three Fiber canvas with all necessary providers.
 */

import { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Scene } from './three';
import { MilestoneCard, Navigation, LoadingScreen } from './ui';
import { useJourneyNavigation } from '../hooks';
import type { JourneyMilestone } from '../types';
import './GlobeCanvas.css';

/**
 * Main globe visualization component.
 * 
 * This is the top-level component that:
 * - Sets up the Three.js canvas
 * - Manages journey navigation state
 * - Renders the 3D scene and UI overlays
 * 
 * @example
 * ```tsx
 * function App() {
 *   return <GlobeCanvas />;
 * }
 * ```
 */
export const GlobeCanvas: React.FC = () => {
  const {
    currentMilestone,
    currentIndex,
    goToNext,
    goToPrevious,
    goToMilestone,
    isTransitioning,
    setIsTransitioning,
  } = useJourneyNavigation();

  /**
   * Handle marker click from 3D scene.
   */
  const handleMarkerClick = useCallback((milestone: JourneyMilestone) => {
    goToMilestone(milestone.id);
  }, [goToMilestone]);

  /**
   * Handle transition events.
   */
  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true);
  }, [setIsTransitioning]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, [setIsTransitioning]);

  /**
   * Close the milestone card and return to overview.
   */
  const handleCloseCard = useCallback(() => {
    goToMilestone(''); // This will set index to -1 (overview)
  }, [goToMilestone]);

  return (
    <div className="globe-canvas">
      {/* Three.js Canvas */}
      <Canvas
        camera={{
          position: [0, 0, 2.5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Suspense fallback={null}>
          <Scene
            currentMilestone={currentMilestone}
            onMarkerClick={handleMarkerClick}
            onTransitionStart={handleTransitionStart}
            onTransitionComplete={handleTransitionComplete}
            autoRotate={!currentMilestone}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Loading screen */}
      <LoadingScreen />

      {/* UI Overlays */}
      <div className="globe-canvas__ui">
        {/* Hero text (shown when no milestone selected) */}
        {!currentMilestone && (
          <header className="globe-canvas__hero">
            <h1 className="globe-canvas__title">
              My Journey
            </h1>
            <p className="globe-canvas__subtitle">
              Click a marker or use navigation to explore
            </p>
          </header>
        )}

        {/* Milestone detail card */}
        <MilestoneCard
          milestone={currentMilestone}
          isVisible={!!currentMilestone}
          onClose={handleCloseCard}
        />

        {/* Navigation controls */}
        <Navigation
          currentIndex={currentIndex}
          onNext={goToNext}
          onPrevious={goToPrevious}
          onSelectMilestone={goToMilestone}
          disabled={isTransitioning}
        />
      </div>
    </div>
  );
};

export default GlobeCanvas;
