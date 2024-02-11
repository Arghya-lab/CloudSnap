import { Box, Typography } from "@mui/material";

interface forecastWidgetPropInterface {
  timeOrDate: string;
  conditionText: string;
  conditionIcon: string;
  temperature: number;
}

function ForecastWidget({
  timeOrDate,
  conditionText,
  conditionIcon,
  temperature,
}: forecastWidgetPropInterface) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
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
    </Box>
  );
}

export default ForecastWidget;
