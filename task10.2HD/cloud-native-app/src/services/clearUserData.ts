import { db } from "../config/firebase";

/**
 * Clear User Data
 * @param userId 
 */
export async function clearUserData(userId: string): Promise<void> {
  await db.collection("liveVitals").doc(userId).delete();

  // 2. Delete vitalHistory entries
  {
    const historyRef = db
      .collection("vitalHistory")
      .doc(userId)
      .collection("entries");
    const historySnap = await historyRef.get();
    const deletes = historySnap.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletes);
  }

  // 3. Delete alerts for this user
  {
    const alertsQuery = db.collection("alerts").where("userId", "==", userId);
    const alertsSnap = await alertsQuery.get();
    const deletes = alertsSnap.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletes);
  }

  // 4. Delete batch summaries
  {
    const batchesRef = db
      .collection("vitalAggregates")
      .doc(userId)
      .collection("batches");
    const batchesSnap = await batchesRef.get();
    const deletes = batchesSnap.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletes);
  }

  // 5. Delete the in-flight accumulator
  await db.collection("aggregates").doc(userId).delete();
}
