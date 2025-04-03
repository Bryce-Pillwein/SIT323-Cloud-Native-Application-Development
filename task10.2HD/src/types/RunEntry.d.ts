/**
 * Run Entry
 */
export interface RunEntry {
  id?: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  distance: number;
  pace: number;
  route: {
    lat: number;
    lng: number;
    timestamp: string;
  }[];
  calories?: number;
  elevationGain?: number;
  createdAt: string;
}
