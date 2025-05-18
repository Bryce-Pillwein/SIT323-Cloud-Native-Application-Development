export type HealthMode = 'idle' | 'run' | 'emergency';

export interface Location {
  lat: number;
  lng: number;
}

export interface BaseHealthData {
  userId: string;
  timestamp: string;        // ISO timestamp
  mode: HealthMode;
  heartRate: number;        // beats per minute
  spo2: number;             // oxygen saturation (%)
  temperature: number;      // degrees Celsius
  motion: boolean;          // is moving or not
  location: Location;
  accelZ: number            // Z axis Accelerometer (fall detection)
  fallDetected: boolean     // Fall detection
}

export interface RunHealthData extends BaseHealthData {
  mode: 'run';
  runId: string;
  pace: number;             // min/km or km/h (define this later)
  distance: number;         // total km run so far
}

export type HealthData = BaseHealthData | RunHealthData;