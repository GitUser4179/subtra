import { NavLink, Outlet } from "react-router"
import { Alert, AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/categories", label: "Categories" },
]

export default function AppLayout({ user, onLogout, errorMessage }) {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: 1.5,
            display: "flex",
            flexWrap: "wrap",
            columnGap: 2,
            rowGap: 1.5,
          }}
        >
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              mr: { xs: 0, sm: 2 },
            }}
          >
            Subtra
          </Typography>

          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              flex: "1 1 280px",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === "/"}
                color="inherit"
                sx={{
                  px: { xs: 1.25, sm: 1.75 },
                  "&.active": {
                    color: "primary.main",
                    backgroundColor: "rgba(139, 73, 56, 0.09)",
                    fontWeight: 750,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              ml: "auto",
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: { xs: "none", md: "block" },
                maxWidth: 220,
                overflowWrap: "anywhere",
              }}
            >
              {user.email}
            </Typography>

            <Button color="primary" variant="outlined" onClick={onLogout} sx={{ flexShrink: 0 }}>
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, sm: 4 },
          flex: 1,
          minWidth: 0,
        }}
      >
        {errorMessage && (
          <Alert severity="error" role="alert" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: "divider",
          py: 2,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Subtra · Subscription tracking
        </Typography>
      </Box>
    </Box>
  )
}
