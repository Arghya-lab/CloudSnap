import { Typography, Box, Skeleton } from "@mui/material";
import { DeviceThermostatOutlined } from "@mui/icons-material";
import { usePreference } from "../context/PreferenceContext";
import { useWeather } from "../context/WeatherContext";
import { dateAndTime } from "../utils/dateTimeFormatter";
import { unitType } from "../types/preference";

function DateTimeLocAndTempMobDevicesOnly() {
  const { weather, isWeatherFetching } = useWeather();
  const { unit } = usePreference();

  if (!weather) return null;
  if (isWeatherFetching) {
    return <Skeleton sx={{marginY: "0.25rem"}} variant="rounded" animation="wave" height={256} />;
  }

  const {
    currentWeather: {
      condition: { text, icon },
      temp_c,
      temp_f,
      feelslike_c,
      feelslike_f,
    },
    location: { name, country },
    localTime: { epochTime, timeZone },
  } = weather;

  const time = dateAndTime(epochTime, timeZone);

  return (
    <Box
      sx={{
        textAlign: 'left',
        marginY: '0.4rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between'
      }}>
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
          sx={{ fontSize: "0.9rem", letterSpacing: "0.16rem", mt: "0.6rem" }}
        >
          {text}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 52,
            }}
            alt={text}
            src={icon}
          />
          <Typography variant="h2">
            {unit === unitType.Metric ? temp_c : temp_f}°
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '0.2rem',
            justifyContent: 'flex-end',
          }}
        >
          <DeviceThermostatOutlined />
          <Typography variant="body1">
            Feels Like : {unit === unitType.Metric ? feelslike_c : feelslike_f}°
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DateTimeLocAndTempMobDevicesOnly;
