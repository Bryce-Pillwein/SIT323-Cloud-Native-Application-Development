import { Router, RequestHandler } from 'express';
import fetch from 'node-fetch';

const router = Router();

const getAlerts: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await fetch(`http://alert-service:3003/v1/alerts/${userId}`);
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    res.status(500).json({ message: 'Failed to fetch alerts' });
  }
};

router.get('/alerts/:userId', getAlerts);

export default router;
