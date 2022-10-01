import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    messageBackgrounds: Palette["primary"];
    userBackgrounds: Palette["primary"];
  }
  interface PaletteOptions {
    messageBackgrounds: PaletteOptions["primary"];
    userBackgrounds: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    messageBackgrounds: {
      light: "#b1f2ff",
      main: "#2196f3",
    },
    userBackgrounds: {
      main: "#eef7fe",
    },
  },
});

export default theme;
