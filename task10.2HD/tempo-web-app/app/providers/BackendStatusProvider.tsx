import { createContext, useContext, useState, useEffect, ReactNode, useCallback, } from "react";
import { BACKEND_URL } from "~/config/backendUrl";

interface BackendStatusContextValue {
  status: "loading" | "up" | "down";
  refresh: () => void;
}

const BackendStatusContext = createContext<BackendStatusContextValue | undefined>(undefined);


export function BackendStatusProvider({ children }: { children: ReactNode; }) {
  const [status, setStatus] = useState<"loading" | "up" | "down">("loading");

  // --- HARD CODED URL ---
  const healthUrl = `${BACKEND_URL}/healthz`;

  /**
   * Check Status
   */
  const checkStatus = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(healthUrl, { cache: "no-cache" });
      setStatus(res.ok ? "up" : "down");
    } catch {
      setStatus("down");
    }
  }, [healthUrl]);


  useEffect(() => {
    checkStatus();
    const id = setInterval(checkStatus, 15_000);
    return () => clearInterval(id);
  }, [checkStatus]);


  return (
    <BackendStatusContext.Provider value={{ status, refresh: checkStatus }}>
      {children}
    </BackendStatusContext.Provider>
  );

}

// custom hook for consuming
export const useBackendStatus = () => {
  const context = useContext(BackendStatusContext);
  if (!context) {
    throw new Error("useBackendStatus must be used within a BackendStatusProvider");
  }
  return context;
}