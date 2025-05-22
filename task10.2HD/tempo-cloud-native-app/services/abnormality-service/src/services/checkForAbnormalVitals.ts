import { HealthData } from '../types/HealthData';
import type { UserProfile } from "../types/UserProfile";

/**
 * Check For Abnormal Vitals
 * @param data 
 * @param profile 
 * @returns 
 */
export function checkForAbnormalVitals(data: HealthData, profile: UserProfile): string | null {
  if (data.heartRate > profile.hrMax) return "heart_rate_too_high";
  if (data.heartRate < profile.hrMin) return "heart_rate_too_low";
  if (data.spo2 < profile.spo2Min) return "low_spo2";
  if (data.temperature > profile.tempMax) return "high_temperature";
  if (!data.motion && data.temperature > profile.faintTemp) return "possible_fainting";

  return null;
}