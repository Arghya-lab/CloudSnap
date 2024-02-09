import React, { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { SearchOutlined, LightMode, DarkMode } from "@mui/icons-material";
import { useAlert } from "../context/AlertContext";
import { getCityNameSuggestion } from "../utils/fetchData";
import { useFetchCityWeather } from "../hooks/useFetchCityWeather";
import { alertSeverity } from "../types/alert";
import { usePreference } from "../context/PreferenceContext";
import { unitType } from "../types/preference";

function InputAndUtils() {
  const { unit, mode, toggleUnitType, toggleMode } = usePreference();
  const { initiateAlert } = useAlert();

  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const fetchWeather = useFetchCityWeather();

  const handleChange = (e) => {
    const newCityValue = e.target.value;
    setCity(newCityValue);
  };

  useEffect(() => {
    //  fetching city name suggestion
    (async () => {
      if (city.length >= 3) {
        const cityNameSuggestion = await getCityNameSuggestion(city);
        setCitySuggestion(cityNameSuggestion);
      }
    })();
  }, [city]);

  const handleUnitChange = () => {
    toggleUnitType();
  };

  const handleChangeMode = () => {
    toggleMode();
  };

  useEffect(() => {
    initiateAlert(alertSeverity.Info, `Mode changed to ${mode}.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    initiateAlert(alertSeverity.Info, `Unit type Changed to ${unit}.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityToFetch = selectedCity.name ? selectedCity.name : city;
    fetchWeather(cityToFetch);
    setSelectedCity("");
  };

  return (
    <Stack direction="row" justifyContent="space-between" marginY="0.8rem">
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
          getOptionLabel={(option) =>
            option ? `${option.name}, ${option.region}, ${option.country}` : ""
          }
          value={selectedCity}
          onChange={(event, newValue) => {
            setSelectedCity(newValue);
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
        <IconButton
          aria-label="search"
          color="primary"
          onClick={handleSubmit}
          type="submit">
          <SearchOutlined />
        </IconButton>
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
    </Stack>
  );
}
export default InputAndUtils;
