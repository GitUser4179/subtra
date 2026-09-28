import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import App from "./App.jsx"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./theme"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
