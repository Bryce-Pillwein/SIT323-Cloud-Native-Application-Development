import express, { Request, Response } from 'express';
import getProfileRoute from './routes/getProfile';
import getMetricsRouter from './routes/getMetrics';


const app = express();
const PORT = process.env.PORT || 3001;

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

// — Main API —
app.use('/v1', getProfileRoute);
app.use('/v1', getMetricsRouter);


// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 profile-service running on port ${PORT}`);
});
