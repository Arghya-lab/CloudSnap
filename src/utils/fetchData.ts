import axios from "axios";
import conf from "../conf/conf";

const apiKey = conf.apiKey;
const baseURL = conf.baseURL;

// we need to pass the baseURL as an object
export const URL = axios.create({
  baseURL,
  timeout: 15000,
});

export const getCityNameSuggestion = async (q: string) => {
  const res = await URL.get("/search.json", {
    params: {
      key: apiKey,
      q,
    },
  });
  return res.data;
};

