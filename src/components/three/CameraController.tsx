/**
 * @fileoverview Camera controller for smooth globe navigation.
 * Handles camera transitions between journey milestones using GSAP.
 */

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import gsap from 'gsap';
import * as THREE from 'three';
import { GLOBE_CONFIG, ANIMATION_CONFIG } from '../../constants/config';
import { latLngToVector3 } from '../../utils/coordinates';
import type { JourneyMilestone } from '../../types';

interface CameraControllerProps {
  /** Current milestone to focus on (null for overview) */
  targetMilestone: JourneyMilestone | null;
  /** Whether user can manually control the camera */
  enableControls?: boolean;
  /** Callback when camera transition completes */
  onTransitionComplete?: () => void;
  /** Callback when camera transition starts */
  onTransitionStart?: () => void;
}

/**
 * Controls camera position and provides smooth transitions.
 * 
 * Features:
 * - Smooth GSAP-powered transitions between milestones
 * - OrbitControls for user interaction
 * - Automatic zoom adjustments
 * - Maintains orbit control constraints
 * 
 * @example
 * ```tsx
 * <CameraController
 *   targetMilestone={currentMilestone}
 *   onTransitionComplete={() => setIsAnimating(false)}
 * />
 * ```
 */
export const CameraController: React.FC<CameraControllerProps> = ({
  targetMilestone,
  enableControls = true,
  onTransitionComplete,
  onTransitionStart,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  const isAnimatingRef = useRef(false);

  /**
   * Handle camera transition when target milestone changes.
   */
  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;

    // Calculate target position
    let targetPosition: THREE.Vector3;
    let targetLookAt: THREE.Vector3;
    let targetDistance: number;

    if (targetMilestone) {
      // Focus on specific milestone
      const [x, y, z] = latLngToVector3(targetMilestone.coordinates);
      targetLookAt = new THREE.Vector3(0, 0, 0); // Look at globe center
      
      // Position camera to view the milestone
      const direction = new THREE.Vector3(x, y, z).normalize();
      targetDistance = GLOBE_CONFIG.CAMERA_DISTANCE * 0.8;
      targetPosition = direction.multiplyScalar(targetDistance);
    } else {
      // Overview position
      targetPosition = new THREE.Vector3(0, 0, GLOBE_CONFIG.CAMERA_DISTANCE);
      targetLookAt = new THREE.Vector3(0, 0, 0);
      targetDistance = GLOBE_CONFIG.CAMERA_DISTANCE;
    }

    // Notify transition start
    onTransitionStart?.();
    isAnimatingRef.current = true;

    // Disable controls during animation
    controls.enabled = false;

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: ANIMATION_CONFIG.CAMERA_TRANSITION,
      ease: ANIMATION_CONFIG.CAMERA_EASING,
      onUpdate: () => {
        camera.lookAt(targetLookAt);
        controls.target.copy(targetLookAt);
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        controls.enabled = enableControls;
        onTransitionComplete?.();
      },
    });

    // Cleanup animation on unmount or target change
    return () => {
      gsap.killTweensOf(camera.position);
    };
  }, [targetMilestone, camera, enableControls, onTransitionComplete, onTransitionStart]);

  /**
   * Keep controls updated each frame.
   */
  useFrame(() => {
    if (controlsRef.current && !isAnimatingRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={enableControls}
      enableRotate={enableControls}
      minDistance={GLOBE_CONFIG.MIN_ZOOM}
      maxDistance={GLOBE_CONFIG.MAX_ZOOM}
      rotateSpeed={0.5}
      zoomSpeed={0.5}
      // Limit vertical rotation to prevent flipping
      minPolarAngle={Math.PI * 0.1}
      maxPolarAngle={Math.PI * 0.9}
    />
  );
};

export default CameraController;
