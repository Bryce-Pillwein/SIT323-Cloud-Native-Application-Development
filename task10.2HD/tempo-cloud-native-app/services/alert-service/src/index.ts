import express, { Request, Response } from 'express';
import postAlertRouter from './routes/postAlert';
import getAlertRouter from './routes/getAlert'
import getMetricsRouter from './routes/getMetrics';

const app = express();
app.use(express.json());


// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});


// — Main API —
app.use('/v1', postAlertRouter);
app.use('/v1', getAlertRouter);
app.use('/v1', getMetricsRouter);


// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 alert-service running on port ${PORT}`);
});
