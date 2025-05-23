import express, { Request, Response } from 'express';
import mqtt from 'mqtt';
import { HealthData } from './types/HealthData';
import { checkForAbnormalVitals } from './services/checkForAbnormalVitals';
import { fetchUserProfile } from './services/fetchProfile';
import { sendAlert } from './services/sendAlert';
import getMetricsRouter from './routes/getMetrics';

// ENV config check
const brokerUrl = process.env.MQTT_BROKER_URL;
const topic = process.env.MQTT_TOPIC;
const profileUrl = process.env.PROFILE_SERVICE_URL;

if (!brokerUrl || !topic || !profileUrl) {
  console.error('Missing required environment variables:');
  console.error(`  MQTT_BROKER_URL: ${brokerUrl}`);
  console.error(`  MQTT_TOPIC: ${topic}`);
  console.error(`  PROFILE_SERVICE_URL: ${profileUrl}`);
  process.exit(1);
}

console.log(`Config Loaded:
  MQTT_BROKER_URL = ${brokerUrl}
  MQTT_TOPIC = ${topic}
  PROFILE_SERVICE_URL = ${profileUrl}
`);

// MQTT Logic
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log(`📡 Connected to MQTT broker at ${brokerUrl}`);
  client.subscribe(topic, (err) => {
    if (err) console.error('Subscription error:', err);
    else console.log(`Subscribed to topic: ${topic}`);
  });
});

client.on('message', async (_topic, message) => {
  try {
    const data: HealthData = JSON.parse(message.toString());

    const profile = await fetchUserProfile(data.userId);
    if (!profile) {
      console.warn(`No profile found for ${data.userId}`);
      return;
    }

    const abnormal = checkForAbnormalVitals(data, profile);

    if (abnormal) {
      console.log(`🚨 Abnormality for ${data.userId}: ${abnormal}`);

      await sendAlert({
        userId: data.userId,
        reason: abnormal,
        vitals: data,
        triggeredAt: new Date().toISOString(),
      });
    } else {
      console.log(`Normal vitals for ${data.userId}`);
    }
  } catch (err) {
    console.error('Failed to process MQTT message:', err);
  }
});


// Lightweight Express app for /healthz
const app = express();
const PORT = process.env.PORT || 3002;

// — Health Probes —
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// — Main API —
app.use('/v1', getMetricsRouter);

// — Custom 404 JSON —
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 abnormality-service health check listening on port ${PORT}`);
});
