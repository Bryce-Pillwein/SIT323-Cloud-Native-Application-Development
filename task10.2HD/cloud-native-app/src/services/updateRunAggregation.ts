import { db } from "../config/firebase";
import { Location, RunHealthData } from "../types/HealthData";
import { haversineDistance } from "./haversineDistance";

/**
 * Updates (or initializes) the aggregation document for a given run.
 */
export async function updateRunAggregation(data: RunHealthData) {
  const { runId, userId, timestamp, location, heartRate } = data;
  const ref = db.collection('runs').doc(runId);

  await db.runTransaction(async tx => {
    const snap = await tx.get(ref);

    if (!snap.exists) {
      // First packet for this run
      tx.set(ref, {
        userId,
        startTime: timestamp,
        lastTime: timestamp,
        lastLocation: location,
        totalDistance: 0,
        heartRateSum: heartRate,
        heartRateCount: 1,
        peakHeartRate: heartRate
      });
    } else {
      // Subsequent packet
      const prev = snap.data() as {
        lastLocation: Location;
        totalDistance: number;
        heartRateSum: number;
        heartRateCount: number;
        peakHeartRate: number;
      };

      const segment = haversineDistance(prev.lastLocation, location);
      const newTotal = prev.totalDistance + segment;
      const sumHR = prev.heartRateSum + heartRate;
      const countHR = prev.heartRateCount + 1;
      const peakHR = Math.max(prev.peakHeartRate, heartRate);

      tx.update(ref, {
        lastTime: timestamp,
        lastLocation: location,
        totalDistance: newTotal,
        heartRateSum: sumHR,
        heartRateCount: countHR,
        peakHeartRate: peakHR
      });
    }
  });
}