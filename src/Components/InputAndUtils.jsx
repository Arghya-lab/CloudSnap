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
  ChangeUnit,
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

  useEffect(() => {
    const fetchCityNameSuggestion = async () => {
      if (city.length >= 3) {
        const cityNameSuggestion = await getCityNameSuggestion(city);
        setCitySuggestion(cityNameSuggestion);
      }
    };
    fetchCityNameSuggestion();
  }, [city]);

  const handleChange = (e) => setCity(e.target.value);

  const handleUnitChange = () => {
    dispatch(ChangeUnit());
    dispatch(
      setAlert({
        severity: "info",
        message: `Unit type Changed.`,
      })
    );
  };
  const handleChangeMode = () => {
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
    setCity(citySuggestion.length > 0 ? citySuggestion[0].name : city);
    const { data, error } = await getWeatherData(city);
    if (data) {
      dispatch(setWeatherAndlocalTime(data));
      dispatch(
        setAlert({
          severity: "success",
          message: `Weather of ${city} fetched.`,
        })
      );
      dispatch(setSavedCity(city));
    } else {
      dispatch(
        setAlert({
          severity: "error",
          message: error.message,
        })
      );
      console.log("data not present", error.message);
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
          onClick={handleSubmit}
          options={citySuggestion.map(
            (option) => `${option.name}, ${option.region}, ${option.country}`
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="City"
              placeholder="Search for city..."
              variant="outlined"
              type="search"
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
