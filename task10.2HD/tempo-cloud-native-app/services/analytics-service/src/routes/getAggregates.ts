import { Router, RequestHandler } from 'express';
import { db } from '../config/firebase';

const router = Router();

const getAggregates: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;
  const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 20, 1), 100);

  try {
    const snapshot = await db
      .collection('vitalAggregates')
      .doc(userId)
      .collection('batches')
      .orderBy('to', 'desc')
      .limit(limit)
      .get();

    const entries = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ userId, count: entries.length, entries });

  } catch (err: any) {
    console.error("❌ Error fetching aggregates:", err);
    res.status(500).json({ message: 'Failed to fetch aggregates' });
  }
};

router.get('/aggregates/:userId', getAggregates);

export default router;
