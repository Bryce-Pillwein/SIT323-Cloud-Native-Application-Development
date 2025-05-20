// src/routes/get/logs.ts
import { Router, Request, Response } from 'express';
import { Logging } from '@google-cloud/logging';
import { db } from '../../config/firebase';

const logging = new Logging();
const router = Router();

/**
 * Get Logs Handler
 * @param req 
 * @param res 
 */
const getLogsHandler = async (req: Request, res: Response): Promise<void> => {
  const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 50, 1), 500);

  try {
    const snap = await db
      .collection('appLogs')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    const logs = snap.docs.map(doc => doc.data());
    res.json({ count: logs.length, logs });
  } catch (err: any) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: err.message });
  }
};

router.get('/logs', getLogsHandler);

export default router;
