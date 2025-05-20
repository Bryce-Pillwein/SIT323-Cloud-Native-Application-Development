// src/components/LogsViewer.tsx

import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '~/config/backendUrl';

interface LogEntry {
  timestamp: string;
  severity: string;
  message: string;
}

interface LogsViewerProps {
  limit?: number;
  pollIntervalMs?: number;
}

const LogsViewer = ({ limit = 50, pollIntervalMs = 15000, }: LogsViewerProps) => {
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/v1/logs?limit=${limit}`
        );
        const data = await res.json();
        const newLogs: LogEntry[] = data.logs.map((l: any) => ({
          timestamp: l.timestamp,
          severity: l.severity,
          message: l.message,
        }));

        setAllLogs(prev => {
          // merge in only truly new entries
          const merged = [...prev];
          newLogs.forEach(l => {
            if (
              !merged.some(
                e => e.timestamp === l.timestamp && e.message === l.message
              )
            ) {
              merged.push(l);
            }
          });
          return merged;
        });
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLogs();
    const id = window.setInterval(fetchLogs, pollIntervalMs);
    return () => window.clearInterval(id);
  }, [limit, pollIntervalMs]);

  // only show the last `limit` entries
  const recent = allLogs.slice(-limit);

  // apply text filter
  const displayed = filter ?
    recent.filter(l => l.message.toLowerCase().includes(filter.toLowerCase()) || l.severity.toLowerCase().includes(filter.toLowerCase()))
    : recent;

  return (
    <div className="grid grid-cols-9 m-4 gap-x-8">
      <div className="col-span-8 my-8 p-4 rounded shadow-sm bg-hsl-l100 border border-hsl95 bg-white">

        <div className="flex items-center gap-x-8">
          <h3 className="font-semibold mb-2">Recent Logs (showing {displayed.length} of {allLogs.length})</h3>


          <input type="text" placeholder="Filter logs…"
            value={filter} onChange={e => setFilter(e.target.value)}
            className="df-input py-1 text-sm"
          />
        </div>

        <div className="mt-4 text-xs font-mono min-h-[500px] max-h-[500px] overflow-auto bg-hsl95 p-2 rounded">
          {displayed.map((l, i) => (
            <p key={`${l.timestamp}-${i}`}>
              <span className="text-gray-500">[{new Date(l.timestamp).toLocaleTimeString()} {l.severity}]</span>{' '}
              {l.message}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LogsViewer;