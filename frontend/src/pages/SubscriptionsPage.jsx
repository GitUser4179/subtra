import { useEffect, useState } from "react"
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
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
        const created = await createSubscription(
          name.trim(),
          Number(price),
          Number(categoryId),
          Number(billingIntervalId),
        )

        setSubscriptions((current) => [...current, created])
      } else {
        const updated = await updateSubscription(
          editingId,
          name.trim(),
          Number(price),
          Number(categoryId),
          Number(billingIntervalId),
        )

        setSubscriptions((current) =>
          current.map((subscription) => (subscription.id === updated.id ? updated : subscription)),
        )
      }

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

  const visibleSubscriptions = subscriptions.filter(
    (subscription) => categoryFilter === "" || String(subscription.categoryId) === categoryFilter,
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h1" variant="h4">
        Subscriptions
      </Typography>

      <Typography component="h2" variant="h6" sx={{ mt: 3 }}>
        {editingId === null ? "Add subscription" : "Edit subscription"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, maxWidth: 400 }}>
        <TextField
          label="Name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          label="Price in SEK"
          type="number"
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
        />

        <TextField
          select
          label="Category"
          required
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

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button type="submit" variant="contained">
            {editingId === null ? "Add subscription" : "Save changes"}
          </Button>
          {editingId !== null && (
            <Button type="button" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>

      {errorMessage && <Typography role="alert">{errorMessage}</Typography>}

      <Typography component="h2" variant="h6" sx={{ mt: 4 }}>
        Your subscriptions
      </Typography>

      <TextField
        select
        label="Filter by category"
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        sx={{ minWidth: 200, mt: 2 }}
      >
        <MenuItem value="">All categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={String(category.id)}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      {isLoading ? (
        <Typography>Loading subscriptions...</Typography>
      ) : visibleSubscriptions.length === 0 ? (
        <Typography>No subscriptions found.</Typography>
      ) : (
        <ul>
          {visibleSubscriptions.map((subscription) => (
            <li key={subscription.id}>
              {subscription.name} - {formatPrice.format(subscription.price)} -{" "}
              {subscription.categoryName} - {subscription.billingIntervalName}
              <Button type="button" onClick={() => startEditing(subscription)}>
                Edit
              </Button>
              <Button type="button" color="error" onClick={() => handleDelete(subscription.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}
