import { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { SearchOutlined, LightMode, DarkMode } from "@mui/icons-material";
import { useAlert } from "../context/AlertContext";
import { useWeather } from "../context/WeatherContext";
import { getCityNameSuggestion } from "../utils/fetchData";
import { alertSeverity } from "../types/alert";
import { usePreference } from "../context/PreferenceContext";
import { unitType } from "../types/preference";
import { locationSuggestionInterface } from "../types/location";

let timeoutId: NodeJS.Timeout;

function InputAndUtils() {
  const { unit, mode, toggleUnitType, toggleMode } = usePreference();
  const { initiateAlert } = useAlert();
  const { fetchWeather } = useWeather();

  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState<locationSuggestionInterface[]>([]);
  const [selectedCity, setSelectedCity] = useState<
    locationSuggestionInterface | ""
  >("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCityValue = e.target.value;
    setCity(newCityValue);
  };

  useEffect(() => {
    // debounce function
    const debounce = (func: () => void, delay: number) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };

    //  fetching city name suggestion
    const fetchCityNameSuggestion = async () => {
      setCitySuggestion([]);

      if (city.length >= 3) {
        const cityNameSuggestion = await getCityNameSuggestion(city);
        setCitySuggestion(cityNameSuggestion);
      }
    };

    debounce(fetchCityNameSuggestion, 750);
  }, [city]);

  const handleUnitChange = () => {
    toggleUnitType();
    initiateAlert(alertSeverity.Info, `Unit type Changed to ${unit}.`);
  };

  const handleChangeMode = () => {
    toggleMode();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedCity) {
      const cityToFetch: string = selectedCity.name ? selectedCity.name : city;
      fetchWeather(cityToFetch);
      setSelectedCity("");
      setCity("")
      setCitySuggestion([]);
    }
  };

  const handleOptionClick = (option: locationSuggestionInterface) => {
    fetchWeather(option.name);

    setSelectedCity("");
    setCity("")
    setCitySuggestion([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginY: "0.8rem",
      }}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        direction="row"
        spacing={1}
        sx={{ width: "85%" }}>
        <Autocomplete
          freeSolo
          fullWidth
          id="city"
          size="small"
          disableClearable
          options={citySuggestion}
          getOptionLabel={(option: string | locationSuggestionInterface) =>
            typeof option === "string"
              ? option
              : `${option.name}, ${option.region}, ${option.country}`
          }
          value={selectedCity}
          onChange={(
            _,
            option: NonNullable<string | locationSuggestionInterface>
          ) => {
            if (typeof option === "object") {
              setSelectedCity(option as locationSuggestionInterface);
              handleOptionClick(option);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="city"
              placeholder="Search for city..."
              variant="outlined"
              value={city}
              onChange={handleChange}
            />
          )}
        />
        <Box onClick={handleSubmit}>
          <IconButton aria-label="search" color="primary">
            <SearchOutlined />
          </IconButton>
        </Box>
      </Stack>
      <Stack direction={"row"}>
        <IconButton
          aria-label="mode switch"
          color="primary"
          onClick={handleChangeMode}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Button onClick={handleUnitChange}>
          {unit === unitType.Metric ? "F" : "M"}
        </Button>
      </Stack>
    </Box>
  );
}
export default InputAndUtils;
