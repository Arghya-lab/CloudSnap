import { useEffect, useMemo } from "react";
import {
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  Stack,
  createTheme,
} from "@mui/material";
import { themeSetting } from "./theme";
import "./App.css";
import HeaderButtons from "./Components/HeaderButtons";
import InputAndUtils from "./Components/InputAndUtils";
import DateTimeAndLocation from "./Components/DateTimeAndLocation";
import CurrentTemperature from "./Components/CurrentTemperature";
import Forecast from "./Components/Forecast";
import DateTimeLocAndTempMobDevicesOnly from "./Components/DateTimeLocAndTempMobDevicesOnly";
import Footer from "./Components/Footer";
import EventAlert from "./Components/EventAlert";
import { useWeather } from "./context/WeatherContext";
import { usePreference } from "./context/PreferenceContext";

function App() {
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const { weather, fetchWeatherByGeoLocation } = useWeather();
  const { mode } = usePreference();
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByGeoLocation(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [fetchWeatherByGeoLocation]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Stack
          sx={{
            width: { xs: "94vw", lg: "1024px" },
          }}>
          <CssBaseline />
          <HeaderButtons />
          <InputAndUtils />
          {!!weather && (
            <>
              {isTabletScreen ? (
                <DateTimeLocAndTempMobDevicesOnly />
              ) : (
                <DateTimeAndLocation />
              )}
              <CurrentTemperature />
              <Forecast />
            </>
          )}
          <Footer />
        </Stack>
        <EventAlert />
      </ThemeProvider>
    </div>
  );
}

export default App;
