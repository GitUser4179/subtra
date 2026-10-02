const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getDashboard() {
    const response = await fetch(`${apiBaseUrl}/api/dashboard`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error(`Failed to load dashboard (${response.status})`)
    }

    return response.json()
}