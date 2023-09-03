import axios from "axios";
import env from "react-dotenv";

const apiKey = env.API_KEY;
const baseURL = env.BASE_URL;

// we need to pass the baseURL as an object
const URL = axios.create({
  baseURL,
  timeout: 5000,
});

export const getCityNameSuggestion = async (q) => {
  try {
    const res = await URL.get("/search.json", {
      params: {
        key: apiKey,
        q,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (city) => {
  try {
    const res = await URL.get("/forecast.json", {
      params: {
        key: apiKey,
        q: city,
        days: 3,
      },
    });
    return { data: res.data };
  } catch (error) {
    return { error: error };
  }
};

export const getWeatherDataByGeoLocation = async (lat, lon) => {
  try {
    const res = await URL.get("/forecast.json", {
      params: {
        key: apiKey,
        q: lat,
        lon,
        days: 5,
      },
    });
    return { data: res.data };
  } catch (error) {
    return { error: error };
  }
};
