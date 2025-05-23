import express, { Request, Response } from 'express';
import getSummaryRouter from './routes/getSummary';
import getAggregatesRouter from './routes/getAggregates';
import getMetricsRouter from './routes/getMetrics';

const app = express();
app.use(express.json());

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});


// — Main API —
app.use('/v1', getSummaryRouter);
app.use('/v1', getAggregatesRouter);
app.use('/v1', getMetricsRouter);


// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`🚀 analytics-service running on port ${PORT}`);
});

