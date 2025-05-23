import { Router, RequestHandler } from 'express';
import { getLatestMetricsSnapshot } from '../services/fetchServiceMetrics';

const router = Router();

const getAllServiceMetrics: RequestHandler = (_req, res) => {
  try {
    const metrics = getLatestMetricsSnapshot();
    res.status(200).json(metrics);
  } catch (err) {
    console.error('Failed to fetch metrics:', err);
    res.status(500).json({ error: 'Could not fetch pod metrics' });
  }
};

router.get('/services-status', getAllServiceMetrics);
export default router;
