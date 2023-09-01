import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWeatherPresent: false,
  location: { name: undefined, country: undefined },
  localTime: { epochTime: undefined, timeZone: undefined },
  currentWeather: {},
  hourlyForecast: [],
  dailyForecast: [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setIsWeatherPresent: (state, action) => {
      state.isWeatherPresent = action.payload;
    },
    setLocation: (state, action) => {
      state.location.name = action.payload.location.name;
      state.location.country = action.payload.location.country;
    },
    setlocalTime: (state, action) => {
      state.localTime.epochTime = action.payload.location.localtime_epoch;
      state.localTime.timeZone = action.payload.location.tz_id;
    },
    setWeather: (state, action) => {
      state.currentWeather = action.payload.current;
      state.hourlyForecast = action.payload.forecast.forecastday[0].hour;
      state.dailyForecast = action.payload.forecast.forecastday;
    },
  },
});

export const { setIsWeatherPresent, setLocation, setlocalTime, setWeather } =
  weatherSlice.actions;

export default weatherSlice.reducer;
