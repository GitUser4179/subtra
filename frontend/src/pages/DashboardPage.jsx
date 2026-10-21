import { useEffect, useState } from "react"
import { Alert, Box, Card, CardContent, Typography } from "@mui/material"
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
    <Box sx={{ display: "grid", gap: 3 }}>
      <Box>
        <Typography component="h1" variant="h4">
          Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          An overview of your subscription costs.
        </Typography>
      </Box>

      {isLoading ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary">Loading dashboard...</Typography>
          </CardContent>
        </Card>
      ) : errorMessage ? (
        <Alert severity="error" role="alert">
          {errorMessage}
        </Alert>
      ) : dashboard.categoryCosts.length === 0 ? (
        <Card>
          <CardContent sx={{ py: { xs: 3, sm: 4 } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
              No subscriptions yet
            </Typography>
            <Typography color="text.secondary">
              No subscription yet, so there is nothing to total.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.main",
              borderColor: "primary.main",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Estimated monthly cost
              </Typography>
              <Typography
                component="p"
                sx={{
                  mt: 1,
                  fontSize: { xs: "2rem", sm: "2.75rem" },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  overflowWrap: "anywhere",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {sekFormatter.format(dashboard.totalMonthlyCost)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.9, maxWidth: 620 }}>
                Yearly subscriptions are spread over 12 months. This is an estimate, not actual
                charges.
              </Typography>
            </CardContent>
          </Card>

          <Box>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Costs by category
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1.5 }}>
              {dashboard.categoryCosts.map((categoryCost) => (
                <Card key={categoryCost.categoryId}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 1.5,
                      p: 2.5,
                      "&:last-child": { pb: 2.5 },
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="subtitle1"
                      sx={{ minWidth: 0, overflowWrap: "anywhere" }}
                    >
                      {categoryCost.categoryName}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "secondary.dark",
                        fontVariantNumeric: "tabular-nums",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {sekFormatter.format(categoryCost.monthlyCost)}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 0.75 }}
                      >
                        / month
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
