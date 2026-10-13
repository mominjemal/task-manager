
const API_URL = "http://localhost:5000"

export async function apiRequest(path, options = {
}) {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (response.status === 401) {
    localStorage.removeItem("token")
    window.location.reload()
    throw new Error("Your session has expired. Please log in again.")
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }

  return data
}
