/**
 * Run Entry
 */
export interface RunEntry {
  id?: string; // Firestore auto-ID
  userId: string;

  // Core metrics
  startTime: string;        // ISO timestamp
  endTime: string | null;   // ISO timestamp or null if still in progress
  distance: number;         // In meters (e.g. 5240)
  pace: number;             // Average pace (seconds per km)

  // Route and position
  route: Coordinate[];      // Array of GPS points
  elevationGain?: number;   // Total elevation gain in meters
  calories?: number;        // Estimated calories burned

  // Optional extras
  heartRateAvg?: number;    // BPM
  heartRateMax?: number;
  weather?: string;         // e.g., "Sunny", "Rainy"
  shoeModel?: string;       // User's input or default

  // Metadata
  createdAt: string;        // ISO timestamp
}

export interface Coordinate {
  lat: number;            // Latitude
  lng: number;            // Longitude
  timestamp: string;      // ISO timestamp at that point in the run
}