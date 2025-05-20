// src/components/PodMetricViewer.tsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  TimeScale, Title, Tooltip, Legend, ChartOptions,
} from 'chart.js';
import { BACKEND_URL } from '~/config/backendUrl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend);

export type PodMetricType = 'cpu' | 'memory';

export interface TimeValue {
  time: Date;
  value: number;
}

interface PodMetricViewerProps {
  namespace?: string;
  metric: PodMetricType;
  limit?: number;         // how many points to keep
  pollIntervalMs?: number; // how often to poll in ms
}

const PodMetricViewer: React.FC<PodMetricViewerProps> = ({ namespace = 'default', metric, limit = 20, pollIntervalMs = 15000, }) => {
  const [data, setData] = useState<TimeValue[]>([]);

  useEffect(() => {
    const fetchMetric = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/k8s-metrics/pods?namespace=${namespace}`);
        const { pods } = await res.json();

        // sum either cpuUsage or memUsage
        const total = pods.reduce((sum: number, p: any) => sum + (metric === 'cpu' ? p.cpuUsage : p.memUsage), 0);

        // keep only the last (limit - 1), then append new
        setData(prev => [...prev.slice(-limit + 1), { time: new Date(), value: total }]);
      } catch (err) {
        console.error(`Error loading pod ${metric} metrics:`, err);
      }
    };

    fetchMetric();

    const id = window.setInterval(fetchMetric, pollIntervalMs);
    return () => window.clearInterval(id);
  }, [namespace, metric, limit, pollIntervalMs]);

  const label = metric === 'cpu'
    ? `CPU Usage (${namespace})`
    : `Memory Usage (${namespace})`;
  const unit = metric === 'cpu' ? 'mC' : 'bytes';

  const chartData = {
    datasets: [
      {
        label: `${label} (${unit})`,
        data: data.map(d => ({ x: d.time, y: d.value })),
        fill: true,
        tension: 0.5,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: label },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'minute' },
        title: { display: true, text: 'Time' },
      },
      y: {
        beginAtZero: false,
        title: { display: true, text: unit },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PodMetricViewer;
