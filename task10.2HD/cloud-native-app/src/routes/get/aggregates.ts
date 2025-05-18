import { Router, Request, Response } from "express";
import { db } from "../../config/firebase";
import { ParsedQs } from 'qs';

const router = Router();

interface AggregatesResponse {
  userId: string;
  count: number;
  entries: Array<{
    from: string;
    to: string;
    avgHeartRate: number;
    avgSpo2: number;
    avgTemperature: number;
    count: number;
  }>;
}

interface ErrorResponse {
  message: string;
}

const getAggregateHandler = async (
  req: Request<{ userId: string }, any, any, ParsedQs>,
  res: Response<AggregatesResponse | ErrorResponse>
): Promise<void> => {
  const { userId } = req.params;
  const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 20, 1), 100);

  try {
    const batchesRef = db
      .collection("vitalAggregates")
      .doc(userId)
      .collection("batches")
      .orderBy("to", "desc")
      .limit(limit);

    const snapshot = await batchesRef.get();
    const entries = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        from: data.from,
        to: data.to,
        avgHeartRate: data.avgHeartRate,
        avgSpo2: data.avgSpo2,
        avgTemperature: data.avgTemperature,
        count: data.count,
      };
    });

    res.json({ userId, count: entries.length, entries });
  } catch (err: any) {
    console.error("Error fetching aggregates:", err);
    res.status(500).json({ message: err.message });
  }
};

router.get('/aggregates/:userId', getAggregateHandler);

export default router;