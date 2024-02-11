import { Box, Stack, Typography, Divider, useMediaQuery } from "@mui/material";
import {
  DeviceThermostatOutlined,
  CloudOutlined,
  WaterDropOutlined,
  AirOutlined,
  WaterOutlined,
  FlareOutlined,
  VisibilityOutlined,
  WbSunny,
  WbTwilight,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import { usePreference } from "../context/PreferenceContext";
import { useWeather } from "../context/WeatherContext";
import { unitType } from "../types/preference";

function CurrentTemperature() {
  const isMobileScreen = useMediaQuery("(max-width:390px)");
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const { unit } = usePreference();
  const { weather } = useWeather();

  if (!weather) {
    return null;
  }

  const { currentWeather, dailyForecasts } = weather;

  const {
    condition: { text, icon },
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    cloud,
    humidity,
    wind_kph,
    wind_mph,
    precip_mm,
    precip_in,
    uv,
    vis_km,
    vis_miles,
  } = currentWeather;

  const {
    day: { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f },
    astro: { sunrise, sunset },
  } = dailyForecasts[0];

  return (
    <Stack
      spacing={isMobileScreen ? "0.2rem" : isTabletScreen ? "1.2rem" : "1rem"}>
      <Typography
        variant="overline"
        sx={{
          display: isTabletScreen ? "none" : "block",
          textTransform: "uppercase",
          fontSize: "1.16rem",
          letterSpacing: "0.16rem",
        }}>
        {text}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobileScreen ? 'column' : 'row',
          justifyContent: isMobileScreen ? 'center' : 'space-between',
        }}
      >
        <Box
          sx={{
            display: isTabletScreen ? 'none' : 'block',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Box
              component="img"
              sx={{
                height: 60,
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
              paddingX: '1.5rem',
            }}
          >
            <DeviceThermostatOutlined />
            <Typography variant="body1">
              Feels Like :{" "}
              {unit === unitType.Metric ? feelslike_c : feelslike_f}°
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: "column",
            gap: "0.25rem",
            alignItems: isMobileScreen ? "center" : undefined
          }}
        >
          <Stack direction="row" spacing="0.2rem">
            <CloudOutlined />
            <Typography variant="body1">Cloud cover : {cloud}%</Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <WaterDropOutlined />
            <Typography variant="body1">Humidity : {humidity}%</Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <AirOutlined />
            <Typography variant="body1">
              Wind speed : {unit === unitType.Metric ? wind_kph : wind_mph}
              {unit === unitType.Metric ? "kph" : "mph"}
            </Typography>
          </Stack>
        </Box>

        <Box
          spacing="0.25rem"
          alignItems={isMobileScreen ? "center" : undefined}>
          <Stack direction="row" spacing="0.2rem">
            <WaterOutlined />
            <Typography variant="body1">
              Precipitation : {unit === unitType.Metric ? precip_mm : precip_in}
              {unit === unitType.Metric ? "mm" : "in"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <FlareOutlined />
            <Typography variant="body1">UV : {uv}</Typography>
          </Stack>
          <Box direction="row" spacing="0.2rem">
            <VisibilityOutlined />
            <Typography variant="body1">
              Visibility :{" "}
              {unit === unitType.Metric ? `${vis_km}km` : `${vis_miles}mile`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isTabletScreen ? 'column' : 'row',
          gap: isTabletScreen
            ? isMobileScreen
              ? '0.2rem'
              : '0.4rem'
            : '1rem',
          justifyContent: isTabletScreen ? undefined : 'center',
          alignItems: isTabletScreen ? 'center' : undefined,
        }}
      >
        <Stack
          direction={isMobileScreen ? "column" : "row"}
          spacing={isMobileScreen ? "0.2rem" : "1rem"}>
          <Stack direction="row" spacing="0.2rem">
            <WbSunny />
            <Typography variant="body1">Sunrise : {sunrise}</Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <WbTwilight />
            <Typography variant="body1">Sunset : {sunset}</Typography>
          </Stack>
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ visibility: isTabletScreen ? "hidden" : "visible" }}
        />

        <Stack
          direction={isMobileScreen ? "column" : "row"}
          spacing={isMobileScreen ? "0.2rem" : "1rem"}>
          <Stack direction="row" spacing="0.2rem">
            <KeyboardArrowUpOutlined />
            <Typography variant="body1">
              Max temp : {unit === unitType.Metric ? maxtemp_c : maxtemp_f}°
            </Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <KeyboardArrowDownOutlined />
            <Typography variant="body1">
              Min temp : {unit === unitType.Metric ? mintemp_c : mintemp_f}°
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default CurrentTemperature;
