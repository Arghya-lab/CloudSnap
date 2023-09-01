import React, { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { SearchOutlined, PlaceOutlined } from "@mui/icons-material";
import { getCityNameSuggestion, getWeatherData, getWeatherDataByGeoLocation } from "../utils/fetchData";
import { useGeolocated } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";
import {
  setMetric,
  setImperial,
  setSavedCity,
} from "../features/weather/infoSlice";
import {
  setLocation,
  setlocalTime,
  setWeather,
} from "../features/weather/weatherSlice";

function InputAndUtils() {
  const dispatch = useDispatch();
  const savedUnitType = useSelector((state) => state.info.unitType);

  const [unitType, setUnitType] = React.useState("metric");
  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);

  useEffect(() => {
    if (savedUnitType === "metric") {
      setUnitType("metric");
    } else if (savedUnitType === "imperial") {
      setUnitType("imperial");
    }
  }, [savedUnitType]);

  useEffect(() => {
    const fetchCityNameSuggestion = async () => {
      if (city.length >= 3) {
        const cityNameSuggestion = await getCityNameSuggestion(city);
        setCitySuggestion(cityNameSuggestion);
      }
    };
    fetchCityNameSuggestion();
  }, [city]);

  const handleUnitChange = (event, value) => setUnitType(value);
  const handleChange = (e) => setCity(e.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCity(citySuggestion.length > 0 ? citySuggestion[0].name : city);
    const data = await getWeatherData(city);
    if (data) {
      dispatch(setLocation(data));
      dispatch(setWeather(data));
      dispatch(setlocalTime(data));
      dispatch(setSavedCity(city));
    } else {
      console.log("datanot");
    }
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  
  const handleGeoLocation = async() => {
    const lat = coords.latitude
    const lon = coords.longitude
    const data = await getWeatherDataByGeoLocation(lat, lon);
    console.log(coords);
    if (data) {
      dispatch(setLocation(data));
      dispatch(setWeather(data));
      dispatch(setlocalTime(data));
      dispatch(setSavedCity(data.location.name));
    } else {
      console.log("datanot");
    }
  }

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
        <Stack direction={"row"}>
          <IconButton
            aria-label="search"
            color="primary"
            onClick={handleSubmit}
            type="submit">
            <SearchOutlined />
          </IconButton>
          <IconButton
            aria-label="location"
            color="primary"
            onClick={handleGeoLocation}>
            <PlaceOutlined />
          </IconButton>
        </Stack>
      </Stack>
      <ToggleButtonGroup
        color="primary"
        value={unitType}
        exclusive
        onChange={handleUnitChange}
        aria-label="unit type">
        <ToggleButton
          value="metric"
          aria-label="metric system"
          onClick={() => dispatch(setMetric())}>
          C
        </ToggleButton>
        <ToggleButton
          value="imperial"
          aria-label="imperial system"
          onClick={() => dispatch(setImperial())}>
          F
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default InputAndUtils;
