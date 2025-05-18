import { db } from "../config/firebase";
import type { HealthData } from "../types/HealthData";

/**
 * send Alert
 * @param userId 
 * @param reason 
 * @param vitals 
 */
export async function sendAlert(userId: string, reason: string, vitals: HealthData) {
  await db.collection("alerts").add({
    userId,
    triggeredAt: new Date().toISOString(),
    reason,
    vitals,
  });
}
