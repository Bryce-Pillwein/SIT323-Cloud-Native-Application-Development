import { db } from "../config/firebase";
import type { HealthData } from "../types/HealthData";

const BATCH_SIZE = 5;

interface Accumulator {
  count: number;
  sumHeartRate: number;
  sumSpo2: number;
  sumTemperature: number;
  firstTimestamp: string;
  lastTimestamp: string;
}

/**
 * Buffer and Aggregate
 * @param data 
 */
export async function bufferAndAggregate(data: HealthData) {
  const summaryRef = db.collection("aggregates").doc(data.userId);
  const snap = await summaryRef.get();
  let acc: Accumulator;

  if (snap.exists) {
    acc = snap.data() as Accumulator;
    acc.count++;
    acc.sumHeartRate += data.heartRate;
    acc.sumSpo2 += data.spo2;
    acc.sumTemperature += data.temperature;
    acc.lastTimestamp = data.timestamp;
  } else {
    acc = {
      count: 1,
      sumHeartRate: data.heartRate,
      sumSpo2: data.spo2,
      sumTemperature: data.temperature,
      firstTimestamp: data.timestamp,
      lastTimestamp: data.timestamp,
    };
  }

  if (acc.count >= BATCH_SIZE) {
    // compute averages
    const avgHeartRate = acc.sumHeartRate / acc.count;
    const avgSpo2 = acc.sumSpo2 / acc.count;
    const avgTemp = acc.sumTemperature / acc.count;

    // write one aggregate record
    await db
      .collection("vitalAggregates")
      .doc(data.userId)
      .collection("batches")
      .add({
        userId: data.userId,
        from: acc.firstTimestamp,
        to: acc.lastTimestamp,
        avgHeartRate,
        avgSpo2,
        avgTemperature: avgTemp,
        count: acc.count,
      });

    // reset accumulator
    await summaryRef.set({}, { merge: true });
  } else {
    // update accumulator
    await summaryRef.set(acc);
  }
}
