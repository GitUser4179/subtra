const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getCsrfToken() {
  const response = await fetch(`${apiBaseUrl}/api/auth/csrf`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token.")
  }

  const data = await response.json()
  return data.requestToken
}

export async function login(email, password) {
  const csrfToken = await getCsrfToken()

  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error(`Login failed.`)
  }

  return response
}

export async function getCurrentUser() {
  const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
    credentials: "include",
  })

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user.")
  }

  return response.json()
}

export async function logout() {
  const csrfToken = await getCsrfToken()
  const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  })

  if (!response.ok) {
    throw new Error("Could not logout.")
  }
}

export async function register(email, password) {
  const csrfToken = await getCsrfToken()

  if (csrfToken == null) {
    throw new Error("Failed to fetch CSRF token")
  }

  const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Registration failed.")
  }

  return response
}
