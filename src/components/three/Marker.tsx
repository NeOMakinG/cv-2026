/**
 * @fileoverview Journey marker component.
 * Renders interactive markers on the globe surface for each milestone.
 */

import { useRef, useState, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MARKER_CONFIG, GLOBE_CONFIG } from '../../constants/config';
import { latLngToVector3 } from '../../utils/coordinates';
import type { JourneyMilestone } from '../../types';

interface MarkerProps {
  /** Milestone data to display */
  milestone: JourneyMilestone;
  /** Whether this marker is currently active/selected */
  isActive?: boolean;
  /** Callback when marker is clicked */
  onClick?: (milestone: JourneyMilestone) => void;
  /** Callback when marker is hovered */
  onHover?: (milestone: JourneyMilestone | null) => void;
}

/**
 * Interactive marker for a journey milestone.
 * 
 * Features:
 * - Positioned on globe surface based on coordinates
 * - Pulsing animation when active
 * - Hover effects with scale transition
 * - Optional HTML tooltip overlay
 * - Color-coded by milestone type
 * 
 * @example
 * ```tsx
 * <Marker
 *   milestone={myMilestone}
 *   isActive={selectedId === myMilestone.id}
 *   onClick={handleMarkerClick}
 * />
 * ```
 */
export const Marker: React.FC<MarkerProps> = ({
  milestone,
  isActive = false,
  onClick,
  onHover,
}) => {
  const markerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Calculate marker position on globe surface.
   * Adds a small elevation to prevent z-fighting.
   */
  const position = useMemo(() => {
    const [x, y, z] = latLngToVector3(
      milestone.coordinates,
      GLOBE_CONFIG.RADIUS + MARKER_CONFIG.ELEVATION
    );
    return new THREE.Vector3(x, y, z);
  }, [milestone.coordinates]);

  /**
   * Calculate rotation to face outward from globe center.
   * This ensures markers are always visible and properly oriented.
   */
  const rotation = useMemo(() => {
    const direction = position.clone().normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    return euler;
  }, [position]);

  /**
   * Marker color based on milestone type or custom color.
   */
  const color = useMemo(() => {
    return new THREE.Color(milestone.color || '#ffffff');
  }, [milestone.color]);

  /**
   * Animation loop for pulse effect and hover scaling.
   */
  useFrame(({ clock }) => {
    if (!markerRef.current || !ringRef.current || !ringMaterialRef.current) return;

    // Pulse animation for active markers
    if (isActive) {
      const pulse = Math.sin(clock.elapsedTime * 3) * 0.2 + 1;
      ringRef.current.scale.setScalar(pulse * 2);
      ringMaterialRef.current.opacity = 0.5 - (pulse - 1) * 0.5;
    }

    // Hover scale animation
    const targetScale = isHovered ? MARKER_CONFIG.HOVER_SCALE : 1;
    markerRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  /**
   * Event handlers for interactivity.
   */
  const handlePointerOver = () => {
    setIsHovered(true);
    onHover?.(milestone);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    onHover?.(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick?.(milestone);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Main marker sphere */}
      <mesh
        ref={markerRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[MARKER_CONFIG.SIZE, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive || isHovered ? 0.8 : 0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Pulsing ring for active state */}
      <mesh ref={ringRef} visible={isActive}>
        <ringGeometry args={[MARKER_CONFIG.SIZE * 1.5, MARKER_CONFIG.SIZE * 2, 32]} />
        <meshBasicMaterial
          ref={ringMaterialRef}
          color={color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML tooltip on hover */}
      {isHovered && (
        <Html
          position={[0, MARKER_CONFIG.SIZE * 3, 0]}
          center
          distanceFactor={2}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="marker-tooltip">
            <span className="marker-tooltip__title">{milestone.title}</span>
            <span className="marker-tooltip__location">{milestone.location}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Marker;
