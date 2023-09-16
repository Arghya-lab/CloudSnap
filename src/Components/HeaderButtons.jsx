import React from "react";
import { ButtonGroup, Button, Box, useMediaQuery } from "@mui/material";

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
      title: "Delhi",
    },
  ];

  const isMobileScreen = useMediaQuery("(max-width:425px)");

  return (
    <Box marginY="0.8rem">
      <ButtonGroup variant="text">
        {cities.map((city) => (
          <Button
            color="info"
            size={isMobileScreen ? "small" : "medium"}
            sx={{ paddingX: isMobileScreen ? "0.8rem" : "1.5rem" }}
            key={city.id}>
            {city.title}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default HeaderButtons;
