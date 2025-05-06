// Providers tsx

import { ReactNode } from "react";
import ModalLoader from "../modals/AModalLoader";
import { AuthProvider } from "./AuthProvider";
import { ModalManagerProvider } from "./ModalManagerProvider";
import { NotificationProvider } from "./NotificationProvider";


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
