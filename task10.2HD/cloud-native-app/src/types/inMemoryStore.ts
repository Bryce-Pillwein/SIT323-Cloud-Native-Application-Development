/**
 * Run Session
 * The backend will process and aggreate data before saving it to firestore
 */
export interface RunSession {
  userId: string;
  startTime: string;
  status: 'active' | 'paused';
  route: { coordinate: { lat: number; lng: number }; timestamp: string }[];
  totalDistance: number;
  totalElevation: number;
  heartRates: number[];
  latestTimestamp: string;
}

export const activeRuns: Record<string, RunSession> = {};
