import { DocumentReference } from 'firebase-admin/firestore';
import { Location } from '../types/HealthData';

/**
 * Compute the great‐circle distance (km) between two geo points.
 */
export function haversineDistance(a: Location, b: Location): number {
  const toRad = (x: number) => x * Math.PI / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.asin(Math.sqrt(h));
}
