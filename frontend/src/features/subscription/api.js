const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { getCsrfToken } from "../auth/api.js"

export async function getSubscriptions(categoryId = null) {
  
  const query = categoryId == null || categoryId === ""
    ? ""
    : `?categoryId=${encodeURIComponent(categoryId)}` // not really necessary to encode since category is an int but it looks cool lol

  const response = await fetch(`${apiBaseUrl}/api/subscriptions${query}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`Failed to load subscriptions (${response.status})`)
  }

  return response.json()
}

export async function getSubscription(id) {
  const response = await fetch(`${apiBaseUrl}/api/subscriptions/${id}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`Failed to load subscriptions (${response.status})`)
  }

  return response.json()
}

export async function createSubscription(name, price, categoryId, billingIntervalId) {
  const csrfToken = await getCsrfToken()
  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/subscriptions`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ name, price, categoryId, billingIntervalId }),
  })

  if (!response.ok) {
    throw new Error("Creating subscription failed.")
  }

  return response.json()
}

export async function updateSubscription(id, name, price, categoryId, billingIntervalId) {
  const csrfToken = await getCsrfToken()
  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/subscriptions/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ name, price, categoryId, billingIntervalId }),
  })

  if (!response.ok) {
    throw new Error("Updating subscription failed.")
  }

  return response.json()
}

export async function deleteSubscription(id) {
  const csrfToken = await getCsrfToken()
  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/subscriptions/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  })

  if (!response.ok) {
    throw new Error("Deleting subscription failed.")
  }
}
