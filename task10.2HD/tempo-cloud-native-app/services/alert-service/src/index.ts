import express from 'express';
import alertRouter from './routes/postAlert';

const app = express();
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

app.use('/v1', alertRouter);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 alert-service running on port ${PORT}`);
});
