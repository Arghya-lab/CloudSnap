import axios from "axios";
import { useDispatch } from "react-redux";
import { setWeatherAndLocalTime } from "../features/weather/weatherSlice";
import { setAlert } from "../features/weather/alertSlice";
import { setSavedCity } from "../features/weather/infoSlice";
import { setIsWeatherPresent } from "../features/weather/weatherSlice";
import conf from "../conf/conf";

const useFetchCityWeather = () => {
  const dispatch = useDispatch();

  const fetchWeather = async (city) => {
    const baseURL = conf.baseURL;
    const apiKey = conf.apiKey;

    // we need to pass the baseURL as an object
    const URL = axios.create({
      baseURL,
      timeout: 5000,
    });

    try {
      const res = await URL.get("/forecast.json", {
        params: {
          key: apiKey,
          q: city,
          days: 3,
        },
      });
      const data = res.data;
      const fetchedCity = data.location.name;
      dispatch(setWeatherAndLocalTime(data));
      dispatch(setIsWeatherPresent(true));
      dispatch(
        setAlert({
          severity: "success",
          message: `Weather of ${fetchedCity} fetched.`,
        })
      );
      dispatch(setSavedCity(fetchedCity));
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: error.message,
        })
      );
    }
  };
  return fetchWeather;
};

export { useFetchCityWeather };
