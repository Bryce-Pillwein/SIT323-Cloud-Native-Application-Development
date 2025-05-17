// App Index

import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// — Middlewares —
app.use(cors());
app.use(express.json());

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

// — API v1 —
app.use('/api', router);

// — Start Server —
app.listen(PORT, () => {
  console.log(`Cloud backend listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});