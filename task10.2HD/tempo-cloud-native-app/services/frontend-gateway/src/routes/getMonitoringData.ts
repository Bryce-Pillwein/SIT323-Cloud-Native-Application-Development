import { Router, RequestHandler } from 'express';
import fetch from 'node-fetch';

const router = Router();

const getMonitoringData: RequestHandler = async (_req, res) => {
  try {
    const response = await fetch('http://monitoring-service:3007/v1/services-status');
    const json = await response.json();
    res.status(200).json(json);
  } catch (err) {
    console.error('Failed to proxy monitoring metrics:', err);
    res.status(500).json({ message: 'Failed to fetch monitoring data' });
  }
};

router.get('/monitoring', getMonitoringData);

export default router;
