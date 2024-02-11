import axios from "axios";
import conf from "../conf/conf";

const apiKey = conf.apiKey;
const baseURL = conf.baseURL;

// we need to pass the baseURL as an object
const URL = axios.create({
  baseURL,
  timeout: 5000,
});

export const getCityNameSuggestion = async (q: string) => {
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

export const getWeatherDataByGeoLocation = async (lat: number, lon: number) => {
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
