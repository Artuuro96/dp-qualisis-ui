import { Dispatch, SetStateAction } from "react";

export interface Alert {
  message: string,
  type: 'error' | 'info' | 'success' | 'warning',
  isOpen: boolean,
}

export interface AlertContextProps {
  alert: Alert;
  setAlert: Dispatch<SetStateAction<Alert>>;
}