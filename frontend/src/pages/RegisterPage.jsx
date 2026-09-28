import { Box, Card, Stack, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
import { register } from "../features/auth/api"
import { Link, useNavigate } from "react-router"

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
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 2 }}>
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 450, p: 4 }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          <Typography component="h1" variant="h4">
            Register
          </Typography>

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
          {errorMessage && <Typography role="alert">{errorMessage}</Typography>}
          <Link to="/login">Already have an account? Sign in.</Link>
        </Stack>
      </Card>
    </Box>
  )
}
