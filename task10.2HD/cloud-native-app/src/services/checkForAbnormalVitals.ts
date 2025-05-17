import { HealthData } from '../types/HealthData';

export function checkForAbnormalVitals(data: HealthData): string | null {
  if (data.heartRate > 180 || data.heartRate < 40) return 'heart_rate_abnormal';
  if (data.spo2 < 90) return 'low_spo2';
  if (data.temperature > 39.5) return 'high_temperature';
  if (!data.motion && data.temperature > 38.5) return 'possible_fainting';
  return null;
}
