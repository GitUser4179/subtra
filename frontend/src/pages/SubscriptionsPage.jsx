import { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import { getCategories } from "../features/categories/api"
import { getBillingIntervals } from "../features/billing-intervals/api"
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
} from "../features/subscription/api"

const formatPrice = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
})

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [categories, setCategories] = useState([])
  const [billingIntervals, setBillingIntervals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [billingIntervalId, setBillingIntervalId] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadPage() {
      try {
        const [loadedSubscriptions, loadedCategories, loadedIntervals] = await Promise.all([
          getSubscriptions(),
          getCategories(),
          getBillingIntervals(),
        ])

        setSubscriptions(loadedSubscriptions)
        setCategories(loadedCategories)
        setBillingIntervals(loadedIntervals)
      } catch (error) {
        console.error(error)
        setErrorMessage("Could not load subscriptions.")
      } finally {
        setIsLoading(false)
      }
    }

    loadPage()
  }, [])

  function resetForm() {
    setName("")
    setPrice("")
    setCategoryId("")
    setBillingIntervalId("")
    setEditingId(null)
  }

  function startEditing(subscription) {
    setEditingId(subscription.id)
    setName(subscription.name)
    setPrice(String(subscription.price))
    setCategoryId(String(subscription.categoryId))
    setBillingIntervalId(String(subscription.billingIntervalId))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage("")

    try {
      if (editingId === null) {
        await createSubscription(
          name.trim(),
          Number(price),
          Number(categoryId),
          Number(billingIntervalId),
        )
      } else {
        await updateSubscription(
          editingId,
          name.trim(),
          Number(price),
          Number(categoryId),
          Number(billingIntervalId),
        )
      }

      setSubscriptions(await getSubscriptions(categoryFilter))
      resetForm()
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not save subscription.")
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this subscription?")) return

    setErrorMessage("")

    try {
      await deleteSubscription(id)
      setSubscriptions((current) => current.filter((subscription) => subscription.id !== id))

      if (editingId === id) resetForm()
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not delete subscription.")
    }
  }

  async function handleFilterChange(value) {
    setCategoryFilter(value)
    setErrorMessage("")

    try {
      setSubscriptions(await getSubscriptions(value))
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not filter subscriptions.")
    }
  }

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.name.toLowerCase().includes(normalizedSearchQuery),
  )

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box>
        <Typography component="h1" variant="h4">
          Subscriptions
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Keep track of your recurring costs.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, "&:last-child": { pb: 3 } }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2.5 }}>
            {editingId === null ? "Add subscription" : "Edit subscription"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <TextField
              label="Price in SEK"
              type="number"
              required
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
            />

            <TextField
              select
              label="Category"
              required
              fullWidth
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={String(category.id)}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Billing interval"
              required
              fullWidth
              value={billingIntervalId}
              onChange={(event) => setBillingIntervalId(event.target.value)}
            >
              <MenuItem value="">Select an interval</MenuItem>
              {billingIntervals.map((interval) => (
                <MenuItem key={interval.id} value={String(interval.id)}>
                  {interval.name}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                gridColumn: { xs: "auto", sm: "1 / -1" },
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Button type="submit" variant="contained">
                {editingId === null ? "Add subscription" : "Save changes"}
              </Button>

              {editingId !== null && (
                <Button type="button" variant="outlined" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert severity="error" role="alert">
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "grid", gap: 2 }}>
        <Typography component="h2" variant="h5">
          Your subscriptions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <TextField
            select
            label="Filter by category"
            value={categoryFilter}
            onChange={(event) => handleFilterChange(event.target.value)}
            fullWidth
          >
            <MenuItem value="">All categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Search subscriptions"
            placeholder="Enter a subscription name"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            slotProps={{
              htmlInput: { "aria-label": "Search subscriptions by name" },
            }}
            fullWidth
          />
        </Box>

        {isLoading ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">Loading subscriptions...</Typography>
            </CardContent>
          </Card>
        ) : subscriptions.length === 0 ? (
          <Card>
            <CardContent>
              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                No subscriptions yet
              </Typography>
              <Typography color="text.secondary">No subscriptions found.</Typography>
            </CardContent>
          </Card>
        ) : filteredSubscriptions.length === 0 ? (
          <Card>
            <CardContent>
              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                No matches
              </Typography>
              <Typography color="text.secondary">No subscriptions match your search.</Typography>
            </CardContent>
          </Card>
        ) : (
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {filteredSubscriptions.map((subscription) => (
              <Box component="li" key={subscription.id} sx={{ minWidth: 0 }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: 2,
                      p: 2.5,
                      "&:last-child": { pb: 2.5 },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{ overflowWrap: "anywhere", mb: 1 }}
                      >
                        {subscription.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: 750,
                          fontSize: "1.35rem",
                          fontVariantNumeric: "tabular-nums",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {formatPrice.format(subscription.price)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "grid", gap: 0.5, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "anywhere" }}
                      >
                        Category: {subscription.categoryName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "anywhere" }}
                      >
                        Billing interval: {subscription.billingIntervalName}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto" }}>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => startEditing(subscription)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        color="error"
                        onClick={() => handleDelete(subscription.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
