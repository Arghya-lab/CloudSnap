import { ButtonGroup, Button, Box, useMediaQuery } from "@mui/material";
import { useWeather } from "../context/WeatherContext";

function HeaderButtons() {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Chennai",
    },
  ];

  const isMobileScreen = useMediaQuery("(max-width:425px)");
  const { fetchWeather } = useWeather()

  return (
    <Box marginY="0.8rem">
      <ButtonGroup variant="text">
        {cities.map((city) => (
          <Button
            color="info"
            size={isMobileScreen ? "small" : "medium"}
            sx={{ paddingX: isMobileScreen ? "0.8rem" : "1.5rem" }}
            key={city.id}
            onClick={() => fetchWeather(city.title)}
          >
            {city.title}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default HeaderButtons;
