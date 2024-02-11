import { Skeleton, Stack, Typography } from "@mui/material";
import { dateAndTime } from "../utils/dateTimeFormatter";
import { useWeather } from "../context/WeatherContext";

function DateTimeAndLocation() {
  const { weather, isWeatherFetching } = useWeather();

  if (!weather) return null;
  if (isWeatherFetching) {
    return <Skeleton sx={{marginY: "0.25rem"}} variant="rounded" animation="wave" height={128} />;
  }

  const {
    location: { name, country },
    localTime: { epochTime, timeZone },
  } = weather;

  const time = dateAndTime(epochTime, timeZone);

  return (
    <Stack spacing={0.8}>
      <Typography>{time}</Typography>
      <Typography variant="h4">
        {name}
        <Typography component="span" variant="button" sx={{ fontSize: "1rem" }}>
          , {country}
        </Typography>
      </Typography>
    </Stack>
  );
}

export default DateTimeAndLocation;
