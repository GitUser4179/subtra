const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { getCsrfToken } from "../auth/api.js"

export async function getCategories() {
    const response = await fetch(`${apiBaseUrl}/api/categories`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error(`Failed to load categories (${response.status})`)
    }

    return response.json()
}

export async function createCategory(name) {
  const csrfToken = await getCsrfToken()

  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/categories`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error("Creating category failed.")
  }

  return response.json()
}

export async function updateCategory(id, name) {
  const csrfToken = await getCsrfToken()

  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/categories/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error("Updating category failed.")
  }

  return response.json()
}

export async function deleteCategory(id) {
  const csrfToken = await getCsrfToken()

  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  })

  if (response.status === 409) {
    throw new Error("This category is used by a subscription")
  }

  if (!response.ok) {
    throw new Error("Deleting category failed.")
  }
}