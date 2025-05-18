import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "~/config/backendUrl";
import { SimulatorElderly } from "~/services/simulators/simulatorElderly";
import type { HealthData } from "~/types/HealthData";

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



  return (
    <div className="grid grid-cols-5 m-4 px-4 py-2 rounded shadow-sm bg-hsl-l100 border border-hsl95 bg-white">

      <div className="col-span-4">
        <h2 className="text-xl font-semibold">Elderly User Panel</h2>

        {lastData ? (
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(lastData, null, 2)}
          </pre>
        ) : (
          <p>No data sent yet.</p>
        )}

        {abnormal && (
          <div className="text-red-700 font-bold">
            🚨 Emergency flagged: {abnormal}
          </div>
        )}

        {alertMessage && (
          <div className="text-red-700 font-bold">{alertMessage}</div>
        )}
      </div>


      <div className="col-span-1">
        <button onClick={() => setRunning((v) => !v)}
          className="px-3 py-1 border rounded">
          {running ? "Stop" : "Start"} Simulation
        </button>
      </div>
    </div>
  );
}

export default PanelElderly;
