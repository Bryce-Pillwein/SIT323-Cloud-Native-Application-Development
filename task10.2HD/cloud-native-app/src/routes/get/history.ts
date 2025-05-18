import { Router, Request, Response } from 'express';
import { db } from '../../config/firebase';
import { ParsedQs } from 'qs';

const router = Router();

/**
 * Get History Handler
 * @param req 
 * @param res 
 */
const getHistoryHandler = async (
  req: Request<{ userId: string }, any, any, ParsedQs>,
  res: Response<{ page: number; size: number; entries: any[] }>
): Promise<void> => {
  const { userId } = req.params;
  const page = Math.max(parseInt(String(req.query.page), 10) || 1, 1);
  const size = Math.min(Math.max(parseInt(String(req.query.size), 10) || 50, 1), 100);

  try {
    const snapshot = await db
      .collection('vitalHistory')
      .doc(userId)
      .collection('entries')
      .orderBy('timestamp', 'desc')
      .offset((page - 1) * size)
      .limit(size)
      .get();

    const entries = snapshot.docs.map(doc => doc.data());
    res.json({ page, size, entries });
  } catch (err: any) {
    console.error('Error fetching history:', err);
    res.status(500).json({ page, size, entries: [] });
  }
};

router.get('/history/:userId', getHistoryHandler);

export default router;
