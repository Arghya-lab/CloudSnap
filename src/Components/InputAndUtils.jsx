import React, { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { SearchOutlined, LightMode, DarkMode } from "@mui/icons-material";
import { getCityNameSuggestion } from "../utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUnit,
  changeMode,
} from "../features/weather/infoSlice";
import { setAlert } from "../features/weather/alertSlice";
import { useFetchCityWeather } from "../hooks/useFetchCityWeather";

function InputAndUtils() {
  const dispatch = useDispatch();
  const unitType = useSelector((state) => state.info.unitType);
  const mode = useSelector((state) => state.info.mode);

  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const fetchWeather = useFetchCityWeather();

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
    dispatch(changeUnit());
  };

  const handleChangeMode = () => {
    dispatch(changeMode());
  };

  useEffect(() => {
    dispatch(
      setAlert({
        severity: "info",
        message: `Mode changed to ${mode}.`,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    dispatch(
      setAlert({
        severity: "info",
        message: `Unit type Changed to ${unitType}.`,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityToFetch = selectedCity.name?selectedCity.name:city
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
            option?`${option.name}, ${option.region}, ${option.country}`:""
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
