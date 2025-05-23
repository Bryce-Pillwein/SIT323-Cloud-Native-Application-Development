import fetch from 'node-fetch';

interface ServiceMetrics {
  service: string;
  uptime: string;
  memory: {
    rss: number;
    heapUsed: number;
    heapTotal: number;
  };
  cpu: {
    user: number;
    system: number;
  };
}

const serviceTargets = [
  { name: 'ingestion-service', url: 'http://ingestion-service:3000/v1/metrics' },
  { name: 'profile-service', url: 'http://profile-service:3001/v1/metrics' },
  { name: 'abnormality-service', url: 'http://abnormality-service:3002/v1/metrics' },
  { name: 'alert-service', url: 'http://alert-service:3003/v1/metrics' },
  { name: 'analytics-service', url: 'http://analytics-service:3004/v1/metrics' },
  // { name: 'simulation-service', url: 'http://simulation-service:3005/v1/metrics' },
  { name: 'frontend-gateway', url: 'http://frontend-gateway:3006/v1/metrics' },
];

let latestMetrics: { data: Record<string, ServiceMetrics>, timestamp: string } = {
  data: {},
  timestamp: ''
};

export async function pollAllServiceMetrics() {
  const newData: Record<string, ServiceMetrics> = {};

  for (const target of serviceTargets) {
    try {
      const res = await fetch(target.url);
      const json = await res.json() as ServiceMetrics;
      newData[target.name] = json;
    } catch (err) {
      console.error(`Failed to fetch metrics from ${target.name}:`, err);
    }
  }

  latestMetrics = {
    data: newData,
    timestamp: new Date().toISOString()
  };
}

export function getLatestMetricsSnapshot() {
  return latestMetrics;
}
