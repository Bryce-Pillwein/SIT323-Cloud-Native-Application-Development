import { HealthMode, HealthData } from './types/HealthData';

export const getRandom = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export function generateHealthData(userId: string, mode: HealthMode, distance = 0): HealthData {
  const base = {
    userId,
    timestamp: new Date().toISOString(),
    mode,
    heartRate: mode === 'run' ? getRandom(130, 180) : getRandom(60, 100),
    spo2: getRandom(93, 99),
    temperature: mode === 'run' ? getRandom(37, 38.5) : getRandom(36, 37.2),
    motion: mode === 'run' ? true : Math.random() > 0.5,
    location: {
      lat: -37.8136 + Math.random() * 0.001,
      lng: 144.9631 + Math.random() * 0.001,
    },
  };

  if (mode === 'run') {
    const pace = getRandom(4, 7); // min/km
    return {
      ...base,
      pace,
      distance: parseFloat((distance + 0.05).toFixed(2)), // add 50m per packet
    };
  }

  return base;
}
