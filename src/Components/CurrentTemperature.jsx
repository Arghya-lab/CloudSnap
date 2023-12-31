import React from "react";
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
import { useSelector } from "react-redux";

function CurrentTemperature() {
  const isMobileScreen = useMediaQuery("(max-width:390px)");
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const unitType = useSelector((state) => state.info.unitType);
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
  } = useSelector((state) => state.weather.currentWeather);

  const {
    day: { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f },
    astro: { sunrise, sunset },
  } = useSelector((state) => state.weather.dailyForecast[0]);

  return (
    <Stack
      spacing={isMobileScreen ? "0.2rem" : isTabletScreen ? "1.2rem" : "1rem"}>
      <Typography
        variant="overline"
        display={isTabletScreen ? "none" : "block"}
        sx={{
          textTransform: "uppercase",
          fontSize: "1.16rem",
          letterSpacing: "0.16rem",
        }}>
        {text}
      </Typography>
      <Stack
        direction={isMobileScreen ? "column" : "row"}
        justifyContent={isMobileScreen ? "center" : "space-between"}>
        <Stack display={isTabletScreen ? "none" : "block"}>
          <Stack direction="row" alignItems="flex-end">
            <Box
              component="img"
              sx={{
                height: 60,
              }}
              alt={text}
              src={icon}
            />
            <Typography variant="h2">
              {unitType === "metric" ? temp_c : temp_f}°
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing="0.2rem"
            justifyContent="end"
            paddingX="1.5rem">
            <DeviceThermostatOutlined />
            <Typography variant="body1">
              Feels Like : {unitType === "metric" ? feelslike_c : feelslike_f}°
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing="0.25rem"
          alignItems={isMobileScreen ? "center" : undefined}>
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
              Wind speed : {unitType === "metric" ? wind_kph : wind_mph}
              {unitType === "metric" ? "kph" : "mph"}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          spacing="0.25rem"
          alignItems={isMobileScreen ? "center" : undefined}>
          <Stack direction="row" spacing="0.2rem">
            <WaterOutlined />
            <Typography variant="body1">
              Precipitation : {unitType === "metric" ? precip_mm : precip_in}
              {unitType === "metric" ? "mm" : "in"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <FlareOutlined />
            <Typography variant="body1">UV : {uv}</Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <VisibilityOutlined />
            <Typography variant="body1">
              Visibility : {unitType === "metric" ? vis_km : vis_miles}
              {unitType === "metric" ? "km" : "mile"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={isTabletScreen ? "column" : "row"}
        spacing={
          isTabletScreen ? (isMobileScreen ? "0.2rem" : "0.4rem") : "1rem"
        }
        justifyContent={isTabletScreen ? undefined : "center"}
        alignItems={isTabletScreen ? "center" : undefined}>
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
              Max temp : {unitType === "metric" ? maxtemp_c : maxtemp_f}°
            </Typography>
          </Stack>
          <Stack direction="row" spacing="0.2rem">
            <KeyboardArrowDownOutlined />
            <Typography variant="body1">
              Min temp : {unitType === "metric" ? mintemp_c : mintemp_f}°
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CurrentTemperature;
