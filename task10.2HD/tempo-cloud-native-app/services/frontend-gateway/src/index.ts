import express, { Request, Response } from 'express';
import cors from 'cors';
import getProfileRouter from './routes/getProfile';
import getAlertsRouter from './routes/getAlerts';
import getSummaryRouter from './routes/getSummary';
import getAggregatesRouter from './routes/getAggregates';
import getMetricsRouter from './routes/getMetrics';
import getMonitoringRouter from './routes/getMonitoringData';

const app = express();
app.use(express.json());
app.use(cors());

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// — Health Probes —
app.get('/test-1', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});


// — Main API —
app.use('/v1', getProfileRouter);
app.use('/v1', getAlertsRouter);
app.use('/v1', getSummaryRouter);
app.use('/v1', getAggregatesRouter);
app.use('/v1', getMetricsRouter);
app.use('/v1', getMonitoringRouter);


// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`🚀 frontend-gateway running on port ${PORT}`);
});
