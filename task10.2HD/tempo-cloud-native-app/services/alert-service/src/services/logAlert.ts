import { db } from "../config/firebase";
import { Alert } from "../types/Alert";

export async function logAlert(alert: Alert) {
  await db.collection("alerts").add(alert);
  console.log(`📨 Alert logged for ${alert.userId}: ${alert.reason}`);
}
