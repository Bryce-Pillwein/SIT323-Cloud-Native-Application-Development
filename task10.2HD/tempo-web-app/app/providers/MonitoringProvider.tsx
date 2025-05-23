import { createContext, useContext, useState, useEffect, useCallback, ReactNode, } from "react";
import { BACKEND_URL } from "~/config/backendUrl";

type Status = "loading" | "up" | "down";

export interface ServiceMetrics {
  uptime: string;
  memory: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  cpu: {
    user: number;
    system: number;
  };
}

export interface ServiceData {
  name: string;
  status: Status;
  metrics?: ServiceMetrics;
}

interface MonitoringContextValue {
  services: ServiceData[];
  timestamp: string | null;
  refresh: () => void;
}

const SERVICES = [
  "ingestion-service", "profile-service", "abnormality-service", "alert-service", "analytics-service",
  // "frontend-gateway"
];

const MonitoringContext = createContext<MonitoringContextValue | undefined>(undefined);

export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<ServiceData[]>(SERVICES.map(name => ({ name, status: "loading" })));
  const [timestamp, setTimestamp] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const metricsRes = await fetch(`${BACKEND_URL}/v1/monitoring`);
      if (!metricsRes.ok) throw new Error(`Failed to fetch /v1/monitoring`);
      const metricsJson = await metricsRes.json();
      const metricsMap: Record<string, ServiceMetrics> = metricsJson.data;
      setTimestamp(metricsJson.timestamp);

      const updatedServices: ServiceData[] = SERVICES.map(name => {
        const metrics = metricsMap[name];
        const status: Status = metrics ? "up" : "down";
        return { name, status, metrics };
      });

      setServices(updatedServices);
    } catch (err) {
      console.error("Failed to refresh monitoring data", err);
      setServices(SERVICES.map(name => ({ name, status: "down" })));
      setTimestamp(null);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000); // every 10s
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <MonitoringContext.Provider value={{ services, timestamp, refresh }}>
      {children}
    </MonitoringContext.Provider>
  );
}

export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error("useMonitoring must be used within a MonitoringProvider");
  }
  return context;
};
