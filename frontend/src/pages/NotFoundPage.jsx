import { Link } from "react-router"
import { Box, Button, Typography } from "@mui/material"

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 2, textAlign: "center" }}>
      <Box>
        <Typography component="h1" variant="h3">
          404
        </Typography>
        <Typography sx={{ mb: 2 }}>This page doesn't exist.</Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Subtra
        </Button>
      </Box>
    </Box>
  )
}
