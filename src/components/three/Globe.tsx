/**
 * @fileoverview Main Globe component.
 * Renders an interactive 3D Earth with atmosphere effect.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GLOBE_CONFIG, COLORS } from '../../constants/config';

interface GlobeProps {
  /** Whether the globe should auto-rotate */
  autoRotate?: boolean;
  /** Rotation speed multiplier */
  rotationSpeed?: number;
}

/**
 * 3D Earth globe with realistic textures and atmosphere.
 * 
 * Features:
 * - Earth texture mapping
 * - Atmosphere glow effect using custom shader
 * - Optional auto-rotation
 * - Smooth idle animation
 * 
 * @example
 * ```tsx
 * <Globe autoRotate rotationSpeed={0.5} />
 * ```
 */
export const Globe: React.FC<GlobeProps> = ({
  autoRotate = true,
  rotationSpeed = 1,
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  /**
   * Load Earth textures.
   * Using placeholder URLs - replace with actual texture paths.
   */
  const [earthTexture] = useTexture([
    // Using a procedural approach for now - you can replace with actual textures
    // '/textures/earth-day.jpg',
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  ]);

  /**
   * Custom atmosphere shader for the glow effect.
   * Creates a Fresnel-based atmospheric scattering simulation.
   */
  const atmosphereShader = useMemo(
    () => ({
      uniforms: {
        uColor: { value: new THREE.Color(COLORS.ATMOSPHERE) },
        uIntensity: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Calculate fresnel effect for atmospheric glow
          vec3 viewDirection = normalize(-vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
          
          // Apply color with fresnel-based alpha
          gl_FragColor = vec4(uColor, fresnel * uIntensity);
        }
      `,
    }),
    []
  );

  /**
   * Animation loop for globe rotation.
   */
  useFrame((_, delta) => {
    if (autoRotate && globeRef.current) {
      globeRef.current.rotation.y += 
        GLOBE_CONFIG.ROTATION_SPEED * rotationSpeed * delta * 60;
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere
        ref={globeRef}
        args={[
          GLOBE_CONFIG.RADIUS,
          GLOBE_CONFIG.WIDTH_SEGMENTS,
          GLOBE_CONFIG.HEIGHT_SEGMENTS,
        ]}
      >
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.1}
          roughness={0.7}
        />
      </Sphere>

      {/* Atmosphere glow layer */}
      <Sphere
        ref={atmosphereRef}
        args={[
          GLOBE_CONFIG.RADIUS * 1.15, // Slightly larger than globe
          GLOBE_CONFIG.WIDTH_SEGMENTS,
          GLOBE_CONFIG.HEIGHT_SEGMENTS,
        ]}
      >
        <shaderMaterial
          {...atmosphereShader}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

export default Globe;
