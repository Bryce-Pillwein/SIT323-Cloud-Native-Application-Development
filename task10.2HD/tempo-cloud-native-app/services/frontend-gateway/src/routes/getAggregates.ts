import { Router, RequestHandler } from 'express';
import fetch from 'node-fetch';

const router = Router();

const getAggregates: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;
  const limit = req.query.limit || 20;

  try {
    const response = await fetch(`http://analytics-service:3004/v1/aggregates/${userId}?limit=${limit}`);
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (err) {
    console.error('Error fetching aggregates:', err);
    res.status(500).json({ message: 'Failed to fetch aggregates' });
  }
};

router.get('/aggregates/:userId', getAggregates);

export default router;
