import express, { Request, Response } from 'express';
import statusRouter from './routes/status';

const app = express();
const PORT = process.env.PORT || 3007;


// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});


// — Main API —
app.use('/v1', statusRouter);


// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


app.listen(PORT, () => {
  console.log(`🚀 monitoring-service running on port ${PORT}`);
});
