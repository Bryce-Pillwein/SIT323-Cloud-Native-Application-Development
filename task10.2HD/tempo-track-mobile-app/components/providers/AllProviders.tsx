// Providers tsx

import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { NotificationProvider } from "./NotificationProvider";
import ModalLoader from "../modals/AModalLoader";
import { ModalManagerProvider } from "./ModalManagerProvider";


interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {

  return (
    <NotificationProvider>
      <AuthProvider>
        <ModalManagerProvider>

          {children}
          <ModalLoader />

        </ModalManagerProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default Providers;
