import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { getDashboard } from "../features/dashboard/api"

const sekFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
})

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadDashboard() {
      try {
        const result = await getDashboard()
        setDashboard(result)
      } catch (error) {
        console.error(error)
        setErrorMessage("Could not load dashboard.")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h1" variant="h4">
        Dashboard
      </Typography>
      {isLoading ? (
        <Typography> Loading dashboard...</Typography>
      ) : errorMessage ? (
        <Typography role="alert">{errorMessage}</Typography>
      ) : dashboard.categoryCosts.length === 0 ? (
        <Typography>No subscription yet, so there is nothing to total.</Typography>
      ) : (
        <>
          <Typography variant="h5">
            Monthly cost: {sekFormatter.format(dashboard.totalMonthlyCost)}
          </Typography>
          <Typography variant="body2">
            Yearly subscriptions are spread over 12 months. This is an estimate, not actual charges.
          </Typography>
          <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
            Per category
          </Typography>
          <ul>
            {dashboard.categoryCosts.map((categoryCost) => (
              <li key={categoryCost.categoryId}>
                {categoryCost.categoryName} : {sekFormatter.format(categoryCost.monthlyCost)}
              </li>
            ))}
          </ul>
        </>
      )}
    </Box>
  )
}
