import axios from "axios";
import conf from "../conf/conf";
import { useWeather } from "../context/WeatherContext";
import { useAlert } from "../context/AlertContext";
import { alertSeverity } from "../types/alert";

const useFetchCityWeather = () => {
  const { setWeatherAndLocalTime } = useWeather();
  const { initiateAlert } = useAlert();

  const fetchWeather = async (city: string) => {
    // we need to pass the baseURL as an object
    const URL = axios.create({
      baseURL: conf.baseURL,
      timeout: 5000,
    });

    try {
      const res = await URL.get("/forecast.json", {
        params: {
          key: conf.apiKey,
          q: city,
          days: 3,
        },
      });
      const data = res.data;
      const fetchedCity = data.location.name;

      setWeatherAndLocalTime(data);
      initiateAlert(
        alertSeverity.Success,
        `Weather of ${fetchedCity} fetched.`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        initiateAlert(alertSeverity.Error, error.message);
      }
    }
  };
  return fetchWeather;
};

export { useFetchCityWeather };
