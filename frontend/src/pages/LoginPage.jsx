import { Box, Card, Stack, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
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
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 2 }}>
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 450, p: 4 }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          <Typography component="h1" variant="h4">
            Sign in to subtra
          </Typography>

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
          {errorMessage && <Typography role="alert">{errorMessage}</Typography>}
        </Stack>
      </Card>
    </Box>
  )
}
