import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { BACKEND_URL } from '~/config/backendUrl';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, TimeScale, ChartOptions,
  ScaleOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface AggregateEntry {
  from: string;
  to: string;
  [key: string]: any;
}

interface AggregatesResponse {
  userId: string;
  count: number;
  entries: AggregateEntry[];
}

interface MetricChartProps {
  userId: string;
  metricKey: string;
  label: string;
  unit: string;
  limit?: number;
  pollIntervalMs?: number;
}

const MetricChart: React.FC<MetricChartProps> = ({ userId, metricKey, label, unit, limit = 20, pollIntervalMs = 15000, }) => {
  const [dataPoints, setDataPoints] = useState<{ time: Date; value: number }[]>([]);
  const intervalRef = useRef<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/v1/aggregates/${userId}?limit=${limit}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json: AggregatesResponse = await res.json();

      // convert to time-series, oldest→newest
      const series = json.entries
        .slice()
        .reverse()
        .map((e) => ({
          time: new Date(e.to),
          value: Number(e[metricKey]) || 0,
        }));
      setDataPoints(series);
    } catch (err) {
      console.error(`Failed to load aggregates for ${metricKey}:`, err);
    }
  };

  useEffect(() => {
    // initial load
    fetchData();
    // set up polling
    intervalRef.current = window.setInterval(fetchData, pollIntervalMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userId, metricKey, limit, pollIntervalMs]);


  const chartData = {
    datasets: [
      {
        label: `${label} (${unit})`,
        data: dataPoints.map(d => ({
          x: d.time,
          y: d.value,
        })),
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `${label} Over Time` },
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

  return (
    <Line data={chartData} options={options} />
  );
};

export default MetricChart;
