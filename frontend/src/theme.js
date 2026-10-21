import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8B4938",
      light: "#B87560",
      dark: "#693426",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#526B63",
      light: "#82978D",
      dark: "#394D46",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F7F3EA",
      paper: "#FFFCF6",
    },
    text: {
      primary: "#2D2925",
      secondary: "#625D55",
    },
    divider: "#D9D0C3",
    error: {
      main: "#B33A32",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#526B63",
      contrastText: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
    h1: {
      fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
      fontWeight: 750,
      lineHeight: 1.2,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontSize: "clamp(1.5rem, 3vw, 1.9rem)",
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: 750,
      lineHeight: 1.25,
      letterSpacing: "-0.025em",
    },
    h5: {
      fontSize: "1.35rem",
      fontWeight: 700,
      lineHeight: 1.35,
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "0.975rem",
      lineHeight: 1.65,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 650,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7F3EA",
          minWidth: 320,
        },
        "::selection": {
          backgroundColor: "#DCC1B5",
          color: "#2D2925",
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFCF6",
          color: "#2D2925",
          borderBottom: "1px solid #D9D0C3",
        },
      },
    },

    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderColor: "#D9D0C3",
          borderRadius: 16,
          backgroundImage: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: "#D9D0C3",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 10,
          paddingInline: 16,
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#693426",
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#394D46",
          },
        },
        outlined: {
          borderColor: "#D9D0C3",
          "&:hover": {
            borderColor: "#8B4938",
            backgroundColor: "rgba(139, 73, 56, 0.05)",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#FFFCF6",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D9D0C3",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8B4938",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#625D55",
          "&.Mui-focused": {
            color: "#8B4938",
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginInline: 4,
          width: "calc(100% - 8px)",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#8B4938",
          textUnderlineOffset: "3px",
          "&:hover": {
            color: "#693426",
          },
        },
      },
    },
  },
})
