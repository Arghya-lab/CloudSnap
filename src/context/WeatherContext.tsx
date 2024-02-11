import React, { ReactNode, createContext, useContext, useState } from "react";
import { WeatherContextInterface, WeatherType } from "../types/weather";
import axios from "axios";
import conf from "../conf/conf";
import { alertSeverity } from "../types/alert";
import { useAlert } from "./AlertContext";
import { URL } from "../utils/fetchData";

const WeatherContext = createContext<WeatherContextInterface>({
  weather: null,
  isWeatherFetching: false,
  fetchWeather: () => { },
  fetchWeatherByGeoLocation: () => { },
});

const useWeather = () => useContext(WeatherContext);

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initiateAlert } = useAlert();
  const [isWeatherFetching, setIsWeatherFetching] = useState(false);
  const [weather, setWeather] = useState<WeatherType>(null);

  const fetchWeather = async (city: string) => {
    setIsWeatherFetching(true)
    try {
      const res = await URL.get("/forecast.json", {
        params: { key: conf.apiKey, q: city, days: 3 },
      });

      const data = res.data;
      const fetchedCity = data.location.name;

      setWeather({
        location: { name: data.location.name, country: data.location.country },
        localTime: {
          epochTime: data.location.localtime_epoch,
          timeZone: data.location.tz_id,
        },
        currentWeather: data.current,
        hourlyForecasts: data.forecast.forecastday[0].hour,
        dailyForecasts: data.forecast.forecastday,
      });

      initiateAlert(
        alertSeverity.Success,
        `Weather of ${fetchedCity} fetched.`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        initiateAlert(alertSeverity.Error, error.message);
      }
    }
    setIsWeatherFetching(false)
  };

  const fetchWeatherByGeoLocation = async (lat: number, lon: number) => {
    try {
      const res = await URL.get("/forecast.json", {
        params: {
          key: conf.apiKey,
          lat,
          lon,
          days: 3,
        },
      });
      return { data: res.data };
    } catch (error) {
      return { error: error };
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, isWeatherFetching, fetchWeather, fetchWeatherByGeoLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { WeatherContext, useWeather, WeatherProvider };
