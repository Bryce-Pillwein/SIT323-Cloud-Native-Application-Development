import { Router, RequestHandler } from 'express';
import { db } from '../config/firebase';

const router = Router();

const getAlerts: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const snapshot = await db
      .collection('alerts')
      .where('userId', '==', userId)
      .orderBy('triggeredAt', 'desc')
      .limit(50)
      .get();

    const alerts = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ userId, count: alerts.length, alerts });
    return;
  } catch (err) {
    console.error('Failed to fetch alerts:', err);
    res.status(500).json({ message: 'Failed to fetch alerts' });
    return;
  }
};

router.get('/alerts/:userId', getAlerts);

export default router;
