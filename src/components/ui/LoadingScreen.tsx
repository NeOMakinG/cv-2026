/**
 * @fileoverview Loading screen component.
 * Displayed while 3D assets are loading.
 */

import { useProgress } from '@react-three/drei';
import './LoadingScreen.css';

interface LoadingScreenProps {
  /** Minimum time to show loading screen (ms) */
  minDuration?: number;
}

/**
 * Full-screen loading indicator with progress bar.
 * Uses Three.js loading progress for accurate feedback.
 * 
 * @example
 * ```tsx
 * <Suspense fallback={<LoadingScreen />}>
 *   <Canvas>...</Canvas>
 * </Suspense>
 * ```
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        {/* Logo or title */}
        <h1 className="loading-screen__title">Loading Journey</h1>
        
        {/* Progress bar */}
        <div className="loading-screen__progress">
          <div 
            className="loading-screen__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <span className="loading-screen__percentage">
          {Math.round(progress)}%
        </span>

        {/* Loading message */}
        <p className="loading-screen__message">
          Preparing the globe...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
