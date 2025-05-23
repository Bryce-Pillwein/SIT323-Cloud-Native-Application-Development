import { Router, RequestHandler } from 'express';
import fetch from 'node-fetch';

const router = Router();

const getSummary: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await fetch(`http://analytics-service:3004/v1/summary/${userId}`);
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
};

router.get('/summary/:userId', getSummary);

export default router;
