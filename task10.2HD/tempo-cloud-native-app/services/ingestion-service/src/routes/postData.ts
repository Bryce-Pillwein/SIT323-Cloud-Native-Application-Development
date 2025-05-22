import { Router, Request, Response } from 'express';
import { validateHealthData } from '../middleware/validation';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { HealthData } from '../types/HealthData';
import { publishHealthData } from '../services/publishToMQTT';

const router = Router();

router.post('/data', validateHealthData, async (req: Request<{}, any, HealthData>, res: Response) => {
  try {
    const data = req.body;

    // Save to liveVitals
    await db.collection('liveVitals').doc(data.userId).set(data);

    // Save to historical entries
    await db
      .collection('vitalHistory')
      .doc(data.userId)
      .collection('entries')
      .doc(uuidv4())
      .set(data);

    // Publish to MQTT
    publishHealthData('tempotrackvital0192837465/health/new', data);

    res.status(200).json({ message: 'Data received and published' });
  } catch (err: any) {
    console.error('Error processing data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
