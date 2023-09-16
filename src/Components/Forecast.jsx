import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ForecastWidget from "./ForecastWidget";
import { time, date } from "../utils/dateTimeFormatter";
import { useMediaQuery } from "@mui/material";

function Forecast() {
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const unitType = useSelector((state) => state.info.unitType);
  const { epochTime, timeZone } = useSelector(
    (state) => state.weather.localTime
  );
  const hourlyForecasts = useSelector((state) => state.weather.hourlyForecast);
  const dailyForecasts = useSelector((state) => state.weather.dailyForecast);

  return (
    <Stack spacing="2rem" marginY="1rem">
      <Box>
        <Box textAlign="left" my="0.8rem">
          <Typography variant="h6">Hourly forecast</Typography>
          <Divider />
        </Box>
        <Stack>
          <Stack direction="row" spacing="2rem" justifyContent="space-around">
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
                        unitType === "metric"
                          ? hourlyForecast.temp_c
                          : hourlyForecast.temp_f
                      }
                    />
                  )
              )}
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Box textAlign="left" my="0.8rem">
          <Typography variant="h6">Daily forecast</Typography>
          <Divider />
        </Box>
        <Stack direction="row" spacing="2rem" justifyContent="space-around">
          {dailyForecasts.map(
            (dailyForecast, index) =>
              index < (isTabletScreen ? 5 : 12) && (
                <ForecastWidget
                  key={index}
                  timeOrDate={date(dailyForecast.date_epoch, timeZone)}
                  conditionText={dailyForecast.day.condition.text}
                  conditionIcon={dailyForecast.day.condition.icon}
                  temperature={
                    unitType === "metric"
                      ? dailyForecast.day.avgtemp_c
                      : dailyForecast.day.avgtemp_f
                  }
                />
              )
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

export default Forecast;
