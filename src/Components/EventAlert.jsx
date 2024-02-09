import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAlert } from "../context/AlertContext";

function EventAlert() {
  const { alert, closeAlert } = useAlert();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlert();
  };
  if (!alert.message) {
    return null;
  } else {
    return (
      <Snackbar
        open={alert.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert
          icon={false}
          onClose={handleClose}
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    );
  }
}

export default EventAlert;
