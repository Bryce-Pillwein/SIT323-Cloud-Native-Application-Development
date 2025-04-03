import express from 'express';
import 'dotenv/config';
import runRouter from './routes/run.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('TempoTrack Cloud Backend is running');
});

app.use('/api/run', runRouter);

export default app;
