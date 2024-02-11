import { ReactNode, createContext, useContext, useState } from "react";
import { PreferenceContextInterface, modeType, unitType } from "../types/preference";

const PreferenceContext = createContext<PreferenceContextInterface>({
  unit: unitType.Metric,
  mode: modeType.Light,
  toggleUnitType: () => { },
  toggleMode: () => { },
})

const usePreference = () => useContext(PreferenceContext)

const PreferenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState(unitType.Metric)
  const [mode, setMode] = useState(modeType.Light)

  const toggleUnitType = () => {
    setUnit(prev => prev === unitType.Metric ? unitType.Imperial : unitType.Metric)
  }

  const toggleMode = () => {
    setMode(prev => prev === modeType.Light ? modeType.Dark : modeType.Light)
  }

  return (
    <PreferenceContext.Provider value={{ unit, mode, toggleUnitType, toggleMode }}>
      {children}
    </PreferenceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { PreferenceContext, usePreference, PreferenceProvider }