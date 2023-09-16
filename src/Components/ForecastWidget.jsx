import React from "react";
import { Box, Stack, Typography } from "@mui/material";

function ForecastWidget({
  timeOrDate,
  conditionText,
  conditionIcon,
  temperature,
}) {
  return (
    <Stack alignItems="center">
      <Typography variant="body2">{timeOrDate}</Typography>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
        }}
        alt={conditionText}
        src={conditionIcon}
      />
      <Typography variant="body2">{temperature}°</Typography>
    </Stack>
  );
}

export default ForecastWidget;
