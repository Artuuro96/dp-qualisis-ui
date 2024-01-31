import React, { ReactNode, createContext, useContext, useState } from "react";
import { AlertContextProps, Alert } from "../interfaces/alert-context";

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const AlertContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert>({
    message: "",
    type: 'success',
    isOpen: false,
  });
  return <AlertContext.Provider value={{ alert, setAlert }}>
    {children}
  </AlertContext.Provider>
}

const useAlertContext = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if(!context) {
    throw new Error('useAlertContext must be used within a AlertContextProvider');
  }
  return context;
}

export { AlertContextProvider, useAlertContext };