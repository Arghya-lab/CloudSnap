import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { DeviceThermostatOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { dateAndTime } from "../utils/dateTimeFormatter";

function DateTimeLocAndTempMobdevicesonil() {
  const unitType = useSelector((state) => state.info.unitType);
  const {
    condition: { text, icon },
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
  } = useSelector((state) => state.weather.currentWeather);
  const { name, country } = useSelector((state) => state.weather.location);
  const { epochTime, timeZone } = useSelector(
    (state) => state.weather.localTime
  );

  const time = dateAndTime(epochTime, timeZone);

  return (
    <Stack
      textAlign="left"
      marginY="0.4rem"
      direction="row"
      justifyContent="space-between">
      <Stack justifyContent="space-between">
        <Box>
          <Typography variant="h5">
            {name}
            <Typography component="span" variant="button">
              , {country}
            </Typography>
          </Typography>
          <Typography variant="body2">{time}</Typography>
        </Box>
        <Typography
          variant="overline"
          sx={{ fontSize: "0.9rem", letterSpacing: "0.16rem" }}
          mt="0.6rem">
          {text}
        </Typography>
      </Stack>
      <Stack>
        <Stack direction="row" alignItems="flex-end">
          <Box
            component="img"
            sx={{
              height: 52,
            }}
            alt={text}
            src={icon}
          />
          <Typography variant="h2">
            {unitType === "metric" ? temp_c : temp_f}°
          </Typography>
        </Stack>
        <Stack direction="row" spacing="0.2rem" justifyContent="flex-end">
          <DeviceThermostatOutlined />
          <Typography variant="body1">
            Feels Like : {unitType === "metric" ? feelslike_c : feelslike_f}°
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DateTimeLocAndTempMobdevicesonil;
