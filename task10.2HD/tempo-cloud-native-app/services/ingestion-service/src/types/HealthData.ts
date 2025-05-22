export type HealthMode = 'idle' | 'run' | 'emergency';

export interface Location {
  lat: number;
  lng: number;
}

export interface BaseHealthData {
  userId: string;
  timestamp: string;
  mode: HealthMode;
  heartRate: number;
  spo2: number;
  temperature: number;
  motion: boolean;
  location: Location;
}

export interface RunHealthData extends BaseHealthData {
  mode: 'run';
  runId: string;
  pace: number;
  distance: number;
}

export type HealthData = BaseHealthData | RunHealthData;
