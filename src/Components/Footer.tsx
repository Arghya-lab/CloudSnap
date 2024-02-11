import { Link, Box, Typography, useMediaQuery } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const isMobileScreen = useMediaQuery("(max-width:580px)");

  return (
    <Box
      sx={{
        my: '1rem',
        display: 'flex',
        flexDirection: isMobileScreen ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobileScreen ? 0 : '0.5em',
      }}
    >
      <Typography>
        &copy; {new Date().getFullYear()} CloudSnap. Special thanks to{" "}
        <Link href="https://www.weatherapi.com/">weatherapi.com</Link>.
      </Typography>
      <Link href="https://github.com/Arghya-lab">
        Visit : <GitHubIcon fontSize="small" /> Github
      </Link>
    </Box>
  );
}

export default Footer;
