import { Router, RequestHandler } from 'express';
import { logAlert } from '../services/logAlert';

const router = Router();

const postAlert: RequestHandler = async (req, res) => {
  const alert = req.body;

  if (!alert.userId || !alert.reason || !alert.vitals) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  alert.triggeredAt = new Date().toISOString();
  await logAlert(alert);

  res.status(200).json({ message: 'Alert received' });
};

router.post('/alert', postAlert);

export default router;
