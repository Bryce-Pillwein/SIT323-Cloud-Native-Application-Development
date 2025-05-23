import express, { Request, Response } from 'express';
import postDataRouter from './routes/postData';

const app = express();
app.use(express.json());

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// — Main API —
app.use('/v1', postDataRouter);

// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 ingestion-service listening on port ${PORT}`);
});
