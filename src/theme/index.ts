import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: 16,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlinedBlue" as any },
          style: {
            textTransform: "none",
            border: "1px solid white",
          },
        },
      ],
    },
  },
});

export default theme;
