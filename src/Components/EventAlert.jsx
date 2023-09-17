import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAlertClose } from "../features/weather/alertSlice";

function EventAlert() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.alert.isOpen);
  const severity = useSelector((state) => state.alert.severity);
  const message = useSelector((state) => state.alert.message);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAlertClose());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert
        icon={false}
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default EventAlert;
