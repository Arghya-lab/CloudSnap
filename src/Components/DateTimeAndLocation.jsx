import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { dateAndTime } from "../utils/dateTimeFormatter"

function DateTimeAndLocation() {
  const { name, country } = useSelector((state) => state.weather.location);
  const { epochTime, timeZone } = useSelector(
    (state) => state.weather.localTime
  );

  const time = dateAndTime(epochTime, timeZone)

  return (
    <Stack spacing={0.8}>
      <Typography>{time}</Typography>
      <Typography variant="h4">
        {name}
        <Typography component="span" variant="button" sx={{fontSize: "1rem"}}>
          , {country}
        </Typography>
      </Typography>
    </Stack>
  );
}

export default DateTimeAndLocation;
