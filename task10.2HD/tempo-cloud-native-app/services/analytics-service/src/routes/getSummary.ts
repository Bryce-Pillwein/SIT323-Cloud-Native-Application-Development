import { Router, RequestHandler } from 'express';
import { db } from '../config/firebase';

const router = Router();

const getSummary: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const snapshot = await db
      .collection('vitalAggregates')
      .doc(userId)
      .collection('batches')
      .orderBy('to', 'desc')
      .limit(20)
      .get();

    const entries = snapshot.docs.map(doc => doc.data());
    const count = entries.length;

    if (!count) {
      res.status(404).json({ message: 'No data found' });
      return;
    }

    const avgHR = entries.reduce((a, b) => a + b.avgHeartRate, 0) / count;
    const avgSpO2 = entries.reduce((a, b) => a + b.avgSpo2, 0) / count;
    const avgTemp = entries.reduce((a, b) => a + b.avgTemperature, 0) / count;

    res.json({ userId, count, avgHR, avgSpO2, avgTemp });
    return;
  } catch (err) {
    console.error('Failed to fetch summary:', err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

router.get('/summary/:userId', getSummary);

export default router;
