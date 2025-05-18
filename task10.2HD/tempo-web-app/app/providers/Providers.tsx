// Providers tsx

import { BackendStatusProvider } from "./BackendStatusProvider";


interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <BackendStatusProvider>

      {children}

    </BackendStatusProvider>
  );
}