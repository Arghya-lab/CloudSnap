import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  severity: null,
  message: null,
  isOpen: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.isOpen = true;
    },
    setAlertClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setAlert, setAlertClose } = alertSlice.actions;
export default alertSlice.reducer;
