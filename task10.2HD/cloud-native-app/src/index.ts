// App Index

import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// — Logging —
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.originalUrl);
  next();
});

// — Middlewares —
app.use(cors());
app.use(express.json());

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

// — API v1 —
app.use('/api', router);

// Custom 404 JSON
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// — Start Server —
app.listen(PORT, () => {
  console.log(`Cloud backend listening on port ${PORT}`);
  // console.log(`http://localhost:${PORT}/`);
});