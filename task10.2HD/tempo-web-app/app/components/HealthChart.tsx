import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { BACKEND_URL } from '~/config/backendUrl';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, TimeScale, ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

type AggregateEntry = {
  from: string;
  to: string;
  avgHeartRate: number;
  avgSpo2: number;
  avgTemperature: number;
  count: number;
};

type AggregatesResponse = {
  userId: string;
  count: number;
  entries: AggregateEntry[];
};

interface HealthChartProps {
  userId: string;
  limit?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({ userId, limit = 20 }) => {
  const [dataPoints, setDataPoints] = useState<{ time: Date; hr: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/v1/aggregates/${userId}?limit=${limit}`)
      .then(res => res.json())
      .then((json: AggregatesResponse) => {
        // Sort oldest → newest
        const series = json.entries
          .slice()
          .reverse()
          .map(e => ({ time: new Date(e.to), hr: e.avgHeartRate }));
        setDataPoints(series);
      })
      .catch(err => console.error("Failed to load aggregates:", err))
      .finally(() => setLoading(false));
  }, [userId, limit]);

  const chartData = {
    labels: dataPoints.map(d => d.time),
    datasets: [
      {
        label: 'Avg Heart Rate (BPM)',
        data: dataPoints.map(d => d.hr),
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Average Heart Rate Over Time' },
    },
    scales: {
      x: { type: 'time' as const, time: { unit: 'minute' } },
      y: { beginAtZero: true, title: { display: true, text: 'BPM' } },
    },
  };

  return (
    <div className="p-4 border rounded shadow">
      {loading ? (
        <p>Loading aggregated data…</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default HealthChart;
