import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Alert, Box, Button, Card, CardContent, Stack, Typography, TextField } from "@mui/material"
import { register } from "../features/auth/api"

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")
    try {
      await register(email, password)

      navigate("/login")
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not register, please try again.")
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
                Create your account
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Get started organizing your subscriptions.
              </Typography>
            </Box>

            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              fullWidth
            />

            <Button disabled={isSubmitting} type="submit" variant="contained" fullWidth>
              {isSubmitting ? "Creating account..." : "Register"}
            </Button>

            {errorMessage && (
              <Alert severity="error" role="alert">
                {errorMessage}
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 650 }}>
                Sign in
              </Box>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
