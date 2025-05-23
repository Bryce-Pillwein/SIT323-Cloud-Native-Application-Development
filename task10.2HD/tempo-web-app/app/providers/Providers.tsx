// Providers tsx

import { MonitoringProvider } from "./MonitoringProvider";


interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <MonitoringProvider>

      {children}

    </MonitoringProvider>
  );
}