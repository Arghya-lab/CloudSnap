export const themeSetting = () => {
//   let backgroundImage;
//   if (temperature < -25) {
//     backgroundImage = "linear-gradient(to right, #6441a5, #2a0845)"; // Twitch color grediant
//   } else if (temperature < -15) {
//     backgroundImage = "linear-gradient(to right, #a8c0ff, #3f2b96)"; // SlightOceanView temperature gradient
//   } else if (temperature < -5) {
//     backgroundImage = "linear-gradient(to right, #7474bf, #348ac7)"; // Stellar temperature gradient
//   } else if (temperature < 5) {
//     backgroundImage = "linear-gradient(to right, #005c97, #363795)"; // ClearSky temperature gradient
//   } else if (temperature < 15) {
//     backgroundImage = "linear-gradient(to right, #2c3e50, #4ca1af)"; // DeepSeaSpace temperature gradient
//   } else if (temperature < 25) {
//     backgroundImage = "linear-gradient(to right, #606c88, #3f4c6b)"; // Ash temperature gradient
//   } else if (temperature < 35) {
//     backgroundImage = "linear-gradient(to right, #ffb347, #ffcc33)"; // PastelOrangeattheSun temperature gradient
//   } else if (temperature < 45) {
//     backgroundImage = "linear-gradient(to right, #f2994a, #f2c94c)"; // Sunkist temperature gradient
//   } else {
//     backgroundImage = "linear-gradient(to right, #fdc830, #f37335)"; // CitrusPeel temperature gradient
//   }

  return {
    // components: {
    //   MuiCssBaseline: {
    //     styleOverrides: {
    //       body: {
    //         backgroundImage,
    //         color: "#FFF",
    //       },
    //     },
    //   },
    // },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontWeight: 300,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontWeight: 400,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontWeight: 400,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontWeight: 400,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontWeight: 400,
      },
    },
  };
};
