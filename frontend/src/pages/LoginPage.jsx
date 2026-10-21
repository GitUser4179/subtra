import { useState } from "react"
import { Link } from "react-router"
import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { getCurrentUser, login } from "../features/auth/api"

export default function LoginPage({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")
    try {
      await login(email, password)
      const currentUser = await getCurrentUser()

      if (currentUser === null) {
        throw new Error("Could not confirm the signed-in session.")
      }

      onLogin(currentUser)
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not login, please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 }, "&:last-child": { pb: 4 } }}>
          <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
            <Box sx={{ mb: 1 }}>
              <Typography
                component="p"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Subtra
              </Typography>
              <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
                Sign in
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Sign in to manage your subscriptions.
              </Typography>
            </Box>

            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              required
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
            />

            <Button disabled={isSubmitting} type="submit" variant="contained" fullWidth>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>

            {errorMessage && (
              <Alert severity="error" role="alert">
                {errorMessage}
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Box component={Link} to="/register" sx={{ color: "primary.main", fontWeight: 650 }}>
                Create an account
              </Box>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
