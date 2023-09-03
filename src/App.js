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
import HeaderBottons from "./Components/HeaderBottons";
import InputAndUtils from "./Components/InputAndUtils";
import DateTimeAndLocation from "./Components/DateTimeAndLocation";
import CurrentTemperature from "./Components/CurrentTemperature";
import Forecast from "./Components/Forecast";
import DateTimeLocAndTempMobdevicesonly from "./Components/DateTimeMobdeviceOnly";
import Footer from "./Components/Footer";
import EventAlert from "./Components/EventAlert";
import { getWeatherData } from "./utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  setWeatherAndlocalTime,
  setIsWeatherPresent,
} from "./features/weather/weatherSlice";
import { setAlert } from "./features/weather/alertSlice";

function App() {
  // const { temp_c } = useSelector((state) => state.weather.currentWeather)

  const isTabletScreen = useMediaQuery("(max-width:768px)");
  
  const dispatch = useDispatch();
  const isWeatherPresent = useSelector((state) => state.weather.isWeatherPresent);
  const savedCity = useSelector((state) => state.info.savedCity);
  const mode = useSelector((state) => state.info.mode);
    
  const theme = useMemo(() =>createTheme(themeSetting(mode)),[mode]);
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      const { data, error } = await getWeatherData(savedCity);
      if (data) {
        //location is undefine error is comming from here
        dispatch(setWeatherAndlocalTime(data));
        dispatch(setIsWeatherPresent(true));

        dispatch(
          setAlert({
            severity: "success",
            message: `Weather of ${savedCity} fetched.`,
          })
        );
      } else {
        console.log("data is not present");
        dispatch(
          setAlert({
            severity: "error",
            message: error.message,
          })
        );
      }
    };

    fetchWeatherData();
  }, [dispatch, savedCity]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Stack
          sx={{
            width: { xs: "94vw", lg: "1024px" },
          }}>
          <CssBaseline />
          <HeaderBottons />
          <InputAndUtils />
          {isWeatherPresent && (
            <>
              {isTabletScreen ? (
                <DateTimeLocAndTempMobdevicesonly />
              ) : (
                <DateTimeAndLocation />
              )}
              <CurrentTemperature />
              <Forecast />
            </>
          )}
          <Footer color="#000" />
        </Stack>
        <EventAlert />
      </ThemeProvider>
    </div>
  );
}

export default App;
