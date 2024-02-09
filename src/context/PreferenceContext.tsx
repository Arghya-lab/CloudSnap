import { ReactNode, createContext, useContext, useState } from "react";
import { PreferenceContextInterface, modeType, unitType } from "../types/preference";

const PreferenceContext = createContext<PreferenceContextInterface>({
  unit: unitType.Metric,
  savedCity: "London",
  mode: modeType.Light,
  toggleUnitType: () => { },
  setCity: () => { },
  toggleMode: () => { },
})

const usePreference = () => useContext(PreferenceContext)

const PreferenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState(unitType.Metric)
  const [savedCity, setSavedCity] = useState("Bengaluru")
  const [mode, setMode] = useState(modeType.Light)

  const toggleUnitType = () => {
    setUnit(prev => prev === unitType.Metric ? unitType.Imperial : unitType.Metric)
  }
  const setCity = (city: string) => {
    setSavedCity(city)
  }
  const toggleMode = () => {
    setMode(prev => prev === modeType.Light ? modeType.Dark : modeType.Light)
  }

  return (
    <PreferenceContext.Provider value={{ unit, savedCity, mode, toggleUnitType, setCity, toggleMode }}>
      {children}
    </PreferenceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { PreferenceContext, usePreference, PreferenceProvider }