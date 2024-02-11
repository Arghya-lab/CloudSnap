import { Box, Divider, Stack, Typography } from "@mui/material";
import ForecastWidget from "./ForecastWidget";
import { date, time } from "../utils/dateTimeFormatter";
import { useMediaQuery } from "@mui/material";
import { useWeather } from "../context/WeatherContext";
import { usePreference } from "../context/PreferenceContext";
import { unitType } from "../types/preference";

function Forecast() {
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const { weather } = useWeather();
  const { unit } = usePreference();

  if (!weather) {
    return null;
  }

  const {
    localTime: { epochTime, timeZone },
    hourlyForecasts,
    dailyForecasts,
  } = weather;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginY: "1rem",
        gap: "2rem",
      }}>
      <Box>
        <Box textAlign="left" my="0.8rem">
          <Typography variant="h6">Hourly forecast</Typography>
          <Divider />
        </Box>
        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "2rem",
            }}>
            {hourlyForecasts
              .filter((hourlyForecast) => hourlyForecast.time_epoch > epochTime)
              .map(
                (hourlyForecast, index) =>
                  index < (isTabletScreen ? 5 : 10) && (
                    <ForecastWidget
                      key={index}
                      timeOrDate={time(hourlyForecast.time_epoch, timeZone)}
                      conditionText={hourlyForecast.condition.text}
                      conditionIcon={hourlyForecast.condition.icon}
                      temperature={
                        unit === unitType.Metric
                          ? hourlyForecast.temp_c
                          : hourlyForecast.temp_f
                      }
                    />
                  )
              )}
          </Box>
        </Stack>
      </Box>

      <Box>
        <Box textAlign="left" my="0.8rem">
          <Typography variant="h6">Daily forecast</Typography>
          <Divider />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: "2rem",
          }}>
          {dailyForecasts.map(
            (dailyForecast, index) =>
              index < (isTabletScreen ? 5 : 12) && (
                <ForecastWidget
                  key={index}
                  timeOrDate={date(dailyForecast.date_epoch, timeZone)}
                  conditionText={dailyForecast.day.condition.text}
                  conditionIcon={dailyForecast.day.condition.icon}
                  temperature={
                    unit === unitType.Metric
                      ? dailyForecast.day.avgtemp_c
                      : dailyForecast.day.avgtemp_f
                  }
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Forecast;
