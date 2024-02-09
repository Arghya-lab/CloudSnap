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
import { useFetchCityWeather } from "./hooks/useFetchCityWeather";
import { useWeather } from "./context/WeatherContext";
import { usePreference } from "./context/PreferenceContext";

function App() {
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  
  const { weather } = useWeather();
  const { savedCity, mode } = usePreference();
  
  const fetchWeather = useFetchCityWeather();
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  useEffect(() => {
    fetchWeather(savedCity)
  }, []);

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
