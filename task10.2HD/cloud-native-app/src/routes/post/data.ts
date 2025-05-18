import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { checkForAbnormalVitals } from '../../services/checkForAbnormalVitals';
import { validateHealthData } from '../../middleware/validation';
import { HealthData, RunHealthData } from '../../types/HealthData';
import { updateRunAggregation } from '../../services/updateRunAggregation';
import { bufferAndAggregate } from '../../services/aggregateHealthData';
import { sendAlert } from '../../services/alertService';
import { UserProfile } from '../../types/UserProfile';

const router = Router();

/**
 * Post Data Handler
 * @param req 
 * @param res 
 */
const postDataHandler = async (
  req: Request<{}, { message: string; abnormal: string | null }, HealthData>,
  res: Response<{ message: string; abnormal: string | null, alertMessage: string | null }>
): Promise<void> => {
  try {
    const data = req.body;
    let alertMessage: string | null = null;

    // 1. fetch profile or use defaults
    const profSnap = await db.collection("USER_PROFILES").doc(data.userId).get();

    if (!profSnap.exists) {
      console.error(`Missing profile for user ${data.userId}`);
      res.status(500).json({ message: "User profile not found", abnormal: null, alertMessage: null });
      return;
    }

    const profile = profSnap.data() as UserProfile;

    // 2. Check for abnormalities
    const abnormal = checkForAbnormalVitals(data, profile);

    // 3. Live snapshot
    await db.collection("liveVitals").doc(data.userId).set(data);

    // 4. Historical entry
    await db
      .collection('vitalHistory')
      .doc(data.userId)
      .collection('entries')
      .doc(uuidv4())
      .set(data);

    // 5. Buffered aggregate
    await bufferAndAggregate(data);

    // Internal alert record
    if (abnormal) {
      await sendAlert(data.userId, abnormal, data)
      // Message for User
      alertMessage = `🚨 Emergency detected (${abnormal}). Help is on the way to ${data.location.lat.toFixed(3)},${data.location.lng.toFixed(3)}.`;
    };

    // Run-mode aggregation
    if (data.mode === 'run') await updateRunAggregation(data as RunHealthData);

    res.status(200).json({ message: 'Data received', abnormal, alertMessage });
  } catch (err: any) {
    console.error('Firestore write error:', err);
    res.status(500).json({ message: 'Failed to write data', abnormal: null, alertMessage: null });
  }
};

router.post(
  '/data',
  validateHealthData,
  postDataHandler
);

export default router;
