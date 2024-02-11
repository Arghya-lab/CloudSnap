import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { SyntheticEvent } from "react";

function EventAlert() {
  const { alert, closeAlert } = useAlert();

  const handleClose = (
    _: SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlert();
  };

  const adaptAlertOnClose = (event: SyntheticEvent) => {
    handleClose(event, "timeout");
  };

  if (!alert.message || !alert.severity) {
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
          onClose={adaptAlertOnClose}
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
