import React, { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { SearchOutlined, LightMode, DarkMode } from "@mui/icons-material";
import { getCityNameSuggestion, getWeatherData } from "../utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUnit,
  setSavedCity,
  changeMode,
} from "../features/weather/infoSlice";
import { setWeatherAndlocalTime } from "../features/weather/weatherSlice";
import { setAlert } from "../features/weather/alertSlice";

function InputAndUtils() {
  const dispatch = useDispatch();
  const unitType = useSelector((state) => state.info.unitType);
  const mode = useSelector((state) => state.info.mode);

  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleChange = (e) => {
    const newCityValue = e.target.value;
    setCity(newCityValue);
  };

  useEffect(() => {
    const fetchCityNameSuggestion = async () => {
      if (city.length >= 3) {
        const cityNameSuggestion = await getCityNameSuggestion(city);
        setCitySuggestion(cityNameSuggestion);
      }
    };
    fetchCityNameSuggestion();
  }, [city]);

  const handleUnitChange = () => {
    //  state is immedietly not changing fix that we can show what happen in alert
    dispatch(changeUnit());
    dispatch(
      setAlert({
        severity: "info",
        message: `Unit type Changed.`,
      })
    );
  };
  const handleChangeMode = () => {
    //  state is immedietly not changing fix that we can show what happen in alert
    dispatch(changeMode());
    dispatch(
      setAlert({
        severity: "info",
        message: `Mode changed.`,
      })
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedCity) {
      const { data, error } = await getWeatherData(selectedCity.name);
      if (data) {
        dispatch(setWeatherAndlocalTime(data));
        dispatch(
          setAlert({
            severity: "success",
            message: `Weather of ${selectedCity.name} fetched.`,
          })
        );
        dispatch(setSavedCity(selectedCity.name));
      } else {
        dispatch(
          setAlert({
            severity: "error",
            message: error.message,
          })
        );
      }
    }
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
            `${option.name}, ${option.region}, ${option.country}`
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
          {unitType === "metric" ? "F" : "M"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default InputAndUtils;
