import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "~/config/backendUrl";
import { SimulatorElderly } from "~/services/simulators/simulatorElderly";
import type { HealthData } from "~/types/HealthData";
import MetricChart from "../MetricChart";

const PanelElderly = ({ userId }: { userId: string }) => {
  const [running, setRunning] = useState(false);
  const [lastData, setLastData] = useState<HealthData | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [abnormal, setAbnormal] = useState<string | null>(null);
  const simRef = useRef(new SimulatorElderly(userId));
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(async () => {
        const data = simRef.current.next();
        setLastData(data);

        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Server error:", res.status, text);
            setAlertMessage(`Error ${res.status}: ${text}`);
            return;
          }

          const json = await res.json();
          setAbnormal(json.abnormal);
          setAlertMessage(json.alertMessage);
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }, 1000);

    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  /**
   * Handle Reset
   */
  const handleReset = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/users/${userId}/data`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Status ${res.status}: ${text}`);
      }
      setLastData(null);
      setAlertMessage(null);
      setAbnormal(null);
    } catch (err: any) {
      console.error("Reset failed:", err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-9 m-4 gap-x-8 h-full">

        <div className="col-span-5 px-4 py-2 rounded shadow-sm bg-hsl-l100 border border-hsl95 bg-white">
          {userId && (
            <MetricChart
              userId={userId}
              metricKey="avgHeartRate"
              label="Average Heart Rate"
              unit="BPM"
            />
          )}
        </div>

        <div className="col-span-3 px-4 py-2 rounded shadow-sm bg-hsl-l100 border border-hsl95 bg-white">
          <div className="flex flex-col h-full">
            <p className="font-drukWide text-xl mb-4 text-center">User Dashboard</p>
            <div className="grid grid-cols-2 text-left">
              <p className="text-sm text-hsl30">User</p>
              <p className="text-sm">{lastData?.userId ?? "-"}</p>

              <p className="text-sm text-hsl30">Location (lat, lng):</p>
              <p className="text-sm">{lastData?.location.lat.toFixed(4)}, {lastData?.location.lng.toFixed(4) ?? "-"}</p>

              <p className="text-sm text-hsl30">Temperature:</p>
              <p className="text-sm">{lastData?.temperature ?? "-"} C</p>

              <p className="text-sm text-hsl30">Oxygen Saturation (%):</p>
              <p className="text-sm">{lastData?.spo2 ?? "-"}</p>

              <p className="text-sm text-hsl30 mt-6">Heart Rate:</p>
              <p className="text-3xl mt-6 text-rose-500">{lastData?.heartRate ?? "-"} bpm</p>
            </div>

            <div className="flex flex-col mt-auto">
              {abnormal && (
                <div className="my-2">
                  <p className="text-red-700 font-bold">Emergency</p>
                  <p>{abnormal}</p>
                </div>
              )}

              {alertMessage && (<div className="my-2">{alertMessage}</div>)}

              <div className="flex justify-end items-center">
                <p className="text-xs text-hsl30">Last Update: {lastData?.timestamp ? new Date(lastData.timestamp).toLocaleString() : "-"}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-1 flex flex-col justify-center items-center p-4">
          <button onClick={() => setRunning((v) => !v)}
            className="px-3 py-1 border rounded bg-white w-full">
            {running ? "Stop" : "Start"} Simulation
          </button>

          <button onClick={handleReset}
            className="mt-4 px-3 py-1 border rounded bg-white w-full"
          >
            Reset Data
          </button>
        </div>
      </div>




    </div>
  );
}

export default PanelElderly;
