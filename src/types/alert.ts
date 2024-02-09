export interface AlertContextInterface {
  alert: AlertInterface;
  initiateAlert: (severity: alertSeverity, message: string) => void;
  closeAlert: () => void;
}

export interface AlertInterface {
  severity: alertSeverity | null;
  message: string | null;
  isOpen: boolean;
}

export enum alertSeverity {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
}
