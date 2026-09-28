import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8B4938", // muted rust
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#526B63", // muted sage
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F7F3EA", // warm paper
      paper: "#FFFCF6", // cards and forms
    },
    text: {
      primary: "#2D2925", // charcoal ink
      secondary: "#625D55",
    },
    divider: "#D9D0C3",
  },
})
