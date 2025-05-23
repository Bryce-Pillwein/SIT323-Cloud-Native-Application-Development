import { ServiceData } from "~/providers/MonitoringProvider";

interface Props {
  service: ServiceData;
}

export default function ServiceStatusCard({ service }: Props) {
  const { name, status, metrics } = service;

  const statusColor = status === "up" ? "text-green-600" : status === "down" ? "text-red-600" : "text-yellow-500";
  const statusIcon = status === "up" ? "🟢" : status === "down" ? "🔴" : "🟡";

  return (
    <div className="border rounded shadow-sm bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <span className={`font-semibold ${statusColor}`}>{statusIcon} {status}</span>
      </div>

      {metrics ? (
        <div className="text-sm space-y-1">

          <div className="grid grid-cols-2 mb-4 gap-x-16">
            <div className="grid grid-cols-2">
              <p className="font-semibold">CPU:</p><p></p>
              <p>User:</p>
              <p className="text-right">{(metrics.cpu.user / 1000).toFixed(2)} ms</p>
              <p>System:</p>
              <p className="text-right"> {(metrics.cpu.system / 1000).toFixed(2)} ms</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="font-semibold">Memory:</p><p></p>
              <p>Heap Used:</p>
              <p className="text-right">{(metrics.memory.heapUsed / 1024 / 1024).toFixed(2)} MB</p>
              <p>Heap Total:</p>
              <p className="text-right">{(metrics.memory.heapTotal / 1024 / 1024).toFixed(2)} MB</p>
              <p>RSS:</p>
              <p className="text-right">{(metrics.memory.rss / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="flex justify-end items-end gap-x-4 text-xs">
            <p className="font-semibold">Uptime: </p>
            <p>{metrics.uptime}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No metrics available</p>
      )}
    </div>
  );
}
