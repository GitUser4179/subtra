const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getBillingIntervals() {
  const response = await fetch(`${apiBaseUrl}/api/billingIntervals`)

  if (!response.ok) {
    throw new Error(`Failed to load billing intervals (${response.status})`)
  }

  return response.json()
}
