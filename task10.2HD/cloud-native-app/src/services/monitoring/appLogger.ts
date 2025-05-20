import { db } from "../../config/firebase";

/**
 * Log To Firestore
 * @param severity 
 * @param message 
 * @param meta 
 */
export async function logToFirestore(severity: 'INFO' | 'WARN' | 'ERROR', message: string, meta: Record<string, any> = {}) {
  await db.collection('appLogs').add({
    timestamp: new Date().toISOString(),
    severity,
    message,
    meta
  });
}
