import { useEffect } from "react";
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
import { getWeatherData } from "./utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setlocalTime,
  setWeather,
  setIsWeatherPresent,
} from "./features/weather/weatherSlice";

function App() {
  // const { temp_c } = useSelector((state) => state.weather.currentWeather)

  const theme = createTheme(themeSetting())
  const isTabletScreen = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();
  const isWeatherPresent = useSelector(
    (state) => state.weather.isWeatherPresent
  );
  const savedCity = useSelector((state) => state.info.savedCity)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(savedCity);
      if (data) {        
        dispatch(setLocation(data)); //location is undefine error is comming from here
        dispatch(setWeather(data));
        dispatch(setlocalTime(data));
        dispatch(setIsWeatherPresent(true));
      } else {
        console.log("data is not present");
      }
    };

    fetchWeatherData();
  }, [dispatch,savedCity]);

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
      </ThemeProvider>
    </div>
  );
}

export default App;
