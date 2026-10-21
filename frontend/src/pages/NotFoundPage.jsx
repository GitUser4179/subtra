import { Link } from "react-router"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 }, "&:last-child": { pb: 5 } }}>
          <Typography
            component="p"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "-0.03em",
              mb: 3,
            }}
          >
            Subtra
          </Typography>

          <Typography
            component="h1"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              fontSize: { xs: "4rem", sm: "5rem" },
              lineHeight: 1,
              letterSpacing: "-0.06em",
            }}
          >
            404
          </Typography>

          <Typography component="h2" variant="h5" sx={{ mt: 2 }}>
            Page not found
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            This page doesn't exist.
          </Typography>

          <Button component={Link} to="/" variant="contained">
            Back to Subtra
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
