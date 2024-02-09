import { ReactNode, createContext, useContext, useState } from "react";
import { AlertContextInterface, AlertInterface, alertSeverity } from "../types/alert";

// create a alert context to manage alert relate data and functions
const AlertContext = createContext<AlertContextInterface>({
  alert: {
    severity: null,
    message: null,
    isOpen: false,
  },
  initiateAlert: () => { },
  closeAlert: () => { },
})

// create a hook to access alert
const useAlert = () => useContext(AlertContext)

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertInterface>({
    severity: null,
    message: null,
    isOpen: false,
  })

  const initiateAlert = (severity: alertSeverity, message: string) => {
    setAlert({
      severity,
      message,
      isOpen: true,
    })
  }

  const closeAlert = () => {
    setAlert({
      severity: null,
      message: null,
      isOpen: false,
    })
  }

  return (
    <AlertContext.Provider value={{ alert, initiateAlert, closeAlert }} >
      {children}
    </AlertContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { AlertContext, useAlert, AlertProvider }