import axios from 'axios';

const INGESTION_URL = process.env.INGESTION_URL || 'http://ingestion-service:3000/v1/data';

interface SimulatedUser {
  userId: string;
  mode: 'idle' | 'run';
  heartRate: number;
  spo2: number;
  temperature: number;
  distance: number;
}

const users: SimulatedUser[] = [
  { userId: 'elderly_1234', mode: 'idle', heartRate: 75, spo2: 96, temperature: 37.0, distance: 0 },
  { userId: 'athlete_1234', mode: 'run', heartRate: 110, spo2: 98, temperature: 36.5, distance: 0 },
];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function vary(value: number, range: number): number {
  return value + (Math.random() * range * 2 - range); // ±range
}

function updateUserVitals(user: SimulatedUser): any {
  const timestamp = new Date().toISOString();
  const isRunning = user.mode === 'run';

  // Simulate HR dynamics
  let hrDelta = isRunning ? Math.random() * 10 : -Math.random() * 5;
  user.heartRate = clamp(user.heartRate + hrDelta, 40, 220);

  // Simulate temperature
  user.temperature = clamp(vary(user.temperature, 0.2), 35, 41);

  // Simulate SpO2
  user.spo2 = clamp(vary(user.spo2, 1), 85, 100);

  // Elderly always idle
  if (user.userId === 'elderly_1234') {
    user.mode = 'idle';

    // Occasionally spike heart rate
    if (Math.random() < 0.1) {
      user.heartRate = clamp(user.heartRate + 30, 40, 220);
    }

  } else if (user.userId === 'athlete_1234') {
    // Alternate run vs idle occasionally
    if (Math.random() < 0.1) {
      user.mode = user.mode === 'run' ? 'idle' : 'run';
    }

    // Distance increases only in run mode
    if (user.mode === 'run') {
      user.distance += 0.2 + Math.random() * 0.3;
    }
  }

  const base = {
    userId: user.userId,
    timestamp,
    mode: user.mode,
    heartRate: Math.round(user.heartRate),
    spo2: Math.round(user.spo2),
    temperature: parseFloat(user.temperature.toFixed(1)),
    motion: user.mode !== 'idle',
    location: {
      lat: -37.84 + Math.random() * 0.01,
      lng: 145.11 + Math.random() * 0.01,
    },
  };

  if (user.mode === 'run') {
    return {
      ...base,
      runId: `run-${user.userId}`,
      pace: Math.round(4 + Math.random() * 2),
      distance: parseFloat(user.distance.toFixed(1)),
    };
  }

  return base;
}

async function sendData(user: SimulatedUser) {
  const payload = updateUserVitals(user);
  try {
    const res = await axios.post(INGESTION_URL, payload);
    console.log(`Sent data for ${user.userId} [HR=${payload.heartRate}, Mode=${payload.mode}]`);
  } catch (err: any) {
    console.error(`Failed to send data for ${user.userId}:`, err?.response?.data || err.message);
  }
}

// Loop every 15s for each user
users.forEach(user => {
  sendData(user);
  setInterval(() => sendData(user), 10000);
});





import express from 'express';

const PORT = process.env.PORT || 3005;
const app = express();

// — Health Probes —
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 simulation-service running on port ${PORT}`);
});