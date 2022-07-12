import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    messageBackgrounds: Palette["primary"];
  }
  interface PaletteOptions {
    messageBackgrounds: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    messageBackgrounds: {
      light: "#b1f2ff",
      main: "#2196f3",
    },
  },
});

export default theme;
