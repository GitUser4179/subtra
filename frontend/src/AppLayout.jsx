import { NavLink, Outlet } from "react-router"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/categories", label: "Categories" },
]

export default function AppLayout({ user, onLogout, errorMessage }) {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 1, py: 1 }}>
          <Typography component="span" variant="h6" sx={{ fontWeight: 700, mr: 2 }}>
            Subtra
          </Typography>
          <Box component="nav" sx={{ display: "flex", flexWrap: "wrap", gap: 1, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === "/"}
                color="inherit"
                sx={{ "&.active": { textDecoration: "underline", textUnderlineOffset: 6 } }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
            {user.email}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={onLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      {errorMessage && (
        <Typography role="alert" sx={{ px: 3, pt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Box component="main" sx={{ maxWidth: 1000, mx: "auto" }}>
        <Outlet />
      </Box>
    </>
  )
}
