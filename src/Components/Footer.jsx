import React from "react";
import { Link, Stack, Typography, useMediaQuery } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const isMobileScreen = useMediaQuery("(max-width:580px)");

  return (
    <Stack
      my="1rem"
      direction={isMobileScreen?"column":"row"}
      alignItems="center"
      justifyContent="center"
      spacing={isMobileScreen?0:"0.5em"}>
      <Typography>
        &copy; {new Date().getFullYear()} CloudSnap. Special thanks to{" "}
        <Link href="https://www.weatherapi.com/">weatherapi.com</Link>.
      </Typography>
      <Link href="https://github.com/Arghya-lab">
        Visit : <GitHubIcon fontSize="small" /> Github
      </Link>
    </Stack>
  );
}

export default Footer;
