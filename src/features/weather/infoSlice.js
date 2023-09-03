import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitType: "metric",
  savedCity: "Bengaluru",
  mode: "light",
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    changeUnit: (state) => {
      state.unitType = state.unitType==="metric"?"imperial":"metric";
    },
    setSavedCity: (state, action) => {
      state.savedCity = action.payload;
    },
    changeMode:(state) => {
      state.mode = state.mode==="light"?"dark":"light";
    },
  },
});

export const { changeUnit, setSavedCity, changeMode } = infoSlice.actions;
export default infoSlice.reducer;
