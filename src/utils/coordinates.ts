/**
 * @fileoverview Coordinate conversion utilities.
 * Handles transformations between geographic coordinates (lat/lng)
 * and Three.js 3D world coordinates.
 */

import type { Coordinates } from '../types';
import { GLOBE_CONFIG } from '../constants/config';

/**
 * Converts latitude/longitude to 3D Cartesian coordinates.
 * 
 * Uses spherical to Cartesian conversion:
 * - x = r * cos(lat) * sin(lng)
 * - y = r * sin(lat)
 * - z = r * cos(lat) * cos(lng)
 * 
 * @param coords - Geographic coordinates (lat/lng in degrees)
 * @param radius - Sphere radius (defaults to globe radius)
 * @returns Tuple of [x, y, z] coordinates
 * 
 * @example
 * ```ts
 * const [x, y, z] = latLngToVector3({ lat: 48.8566, lng: 2.3522 });
 * // Returns position for Paris on the globe
 * ```
 */
export const latLngToVector3 = (
  coords: Coordinates,
  radius: number = GLOBE_CONFIG.RADIUS
): [number, number, number] => {
  // Convert degrees to radians
  const latRad = (coords.lat * Math.PI) / 180;
  const lngRad = (coords.lng * Math.PI) / 180;

  // Spherical to Cartesian conversion
  // Note: Three.js uses Y-up coordinate system
  const x = radius * Math.cos(latRad) * Math.sin(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lngRad);

  return [x, y, z];
};

/**
 * Converts 3D Cartesian coordinates back to latitude/longitude.
 * Useful for camera position calculations.
 * 
 * @param position - 3D position [x, y, z]
 * @returns Geographic coordinates
 */
export const vector3ToLatLng = (
  position: [number, number, number]
): Coordinates => {
  const [x, y, z] = position;
  const radius = Math.sqrt(x * x + y * y + z * z);

  const lat = (Math.asin(y / radius) * 180) / Math.PI;
  const lng = (Math.atan2(x, z) * 180) / Math.PI;

  return { lat, lng };
};

/**
 * Calculates the camera position to view a specific point on the globe.
 * Positions the camera at a distance looking at the target point.
 * 
 * @param coords - Target coordinates to look at
 * @param distance - Distance from globe center
 * @returns Camera position as [x, y, z]
 */
export const getCameraPositionForCoords = (
  coords: Coordinates,
  distance: number = GLOBE_CONFIG.CAMERA_DISTANCE
): [number, number, number] => {
  // Get the position on the globe surface
  const [x, y, z] = latLngToVector3(coords, distance);
  
  return [x, y, z];
};

/**
 * Calculates the great-circle distance between two points on a sphere.
 * Uses the Haversine formula for accuracy.
 * 
 * @param coords1 - First point
 * @param coords2 - Second point
 * @returns Distance in the same units as the radius
 */
export const greatCircleDistance = (
  coords1: Coordinates,
  coords2: Coordinates
): number => {
  const lat1Rad = (coords1.lat * Math.PI) / 180;
  const lat2Rad = (coords2.lat * Math.PI) / 180;
  const deltaLat = ((coords2.lat - coords1.lat) * Math.PI) / 180;
  const deltaLng = ((coords2.lng - coords1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return GLOBE_CONFIG.RADIUS * c;
};

/**
 * Interpolates between two coordinate points.
 * Useful for smooth camera transitions.
 * 
 * @param start - Starting coordinates
 * @param end - Ending coordinates
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated coordinates
 */
export const lerpCoordinates = (
  start: Coordinates,
  end: Coordinates,
  t: number
): Coordinates => {
  return {
    lat: start.lat + (end.lat - start.lat) * t,
    lng: start.lng + (end.lng - start.lng) * t,
  };
};
