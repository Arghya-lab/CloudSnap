import React, { ReactNode, createContext, useContext, useState } from "react";
import { WeatherContextInterface, WeatherApiResInterface, WeatherType } from "../types/weather";

const WeatherContext = createContext<WeatherContextInterface>({
  weather: null,
  setWeatherAndLocalTime: () => { },
})

const useWeather = () => useContext(WeatherContext)

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherType>(null)

  const setWeatherAndLocalTime = (data: WeatherApiResInterface) => {
    setWeather({
      location: { name: data.location.name, country: data.location.country },
      localTime: { epochTime: data.location.localtime_epoch, timeZone: data.location.tz_id },
      currentWeather: data.current,
      hourlyForecasts: data.forecast.forecastday[0].hour,
      dailyForecasts: data.forecast.forecastday,
    })
  }
  return (
    <WeatherContext.Provider value={{ weather, setWeatherAndLocalTime }}>
      {children}
    </WeatherContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { WeatherContext, useWeather, WeatherProvider }