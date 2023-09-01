export const themeSetting = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            palette: {
              mode: 'light',
            },
          }
        : {
            // palette values for dark mode
            palette: {
              mode: 'dark',
            },
          }),
    },
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
