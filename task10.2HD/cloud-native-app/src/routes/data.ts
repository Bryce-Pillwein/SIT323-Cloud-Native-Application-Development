import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/firebase';
import { checkForAbnormalVitals } from '../services/checkForAbnormalVitals';
import { validateHealthData } from '../middleware/validation';
import { HealthData, RunHealthData } from '../types/HealthData';
import { updateRunAggregation } from '../services/updateRunAggregation';

const router = Router();

/**
 * Post Data Handler
 * @param req 
 * @param res 
 */
const postDataHandler = async (
  req: Request<{}, { message: string; abnormal: string | null }, HealthData>,
  res: Response<{ message: string; abnormal: string | null }>
): Promise<void> => {
  const data = req.body;
  const abnormal = checkForAbnormalVitals(data);

  try {
    // Latest snapshot
    await db.collection('liveVitals')
      .doc(data.userId)
      .set(data);

    // Historical entry
    await db
      .collection('vitalHistory')
      .doc(data.userId)
      .collection('entries')
      .doc(uuidv4())
      .set(data);

    // Internal alert record
    if (abnormal) {
      await db.collection('alerts').add({
        userId: data.userId,
        triggeredAt: new Date().toISOString(),
        reason: abnormal,
        vitals: data
      });
    }

    // Run-mode aggregation
    if (data.mode === 'run') {
      await updateRunAggregation(data as RunHealthData);
    }

    res.status(200).json({ message: 'Data received', abnormal });
  } catch (err: any) {
    console.error('Firestore write error:', err);
    res.status(500).json({ message: 'Failed to write data', abnormal: null });
  }
};

router.post(
  '/data',
  validateHealthData,
  postDataHandler
);

export default router;
