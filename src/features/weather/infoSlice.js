import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitType: "metric",
  savedCity: "Bengaluru",
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setMetric: (state) => {
        state.unitType = "metric";
      },
    setImperial: (state) => {
      state.unitType = "imperial";
    },
    setSavedCity: (state, action) => {
      state.savedCity = action.payload;
    },
  },
});

export const { setMetric, setImperial, setSavedCity } = infoSlice.actions;

export default infoSlice.reducer;
