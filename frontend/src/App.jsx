import { useEffect, useState } from "react"
import { getCurrentUser, logout } from "./features/auth/api"
import { Routes, Route, Navigate } from "react-router"
import AppLayout from "./AppLayout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import CategoriesPage from "./pages/CategoriesPage"
import SubscriptionsPage from "./pages/SubscriptionsPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error(error)
      } finally {
        setIsCheckingSession(false)
      }
    }

    checkSession()
  }, [])

  async function handleLogout() {
    setErrorMessage("")

    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not logout, please try again.")
    }
  }

  if (isCheckingSession) return <p>Checking session...</p>
  return (
    <Routes>
      <Route
        element={
          user ? (
            <AppLayout user={user} onLogout={handleLogout} errorMessage={errorMessage} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
      </Route>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={setUser} />}
      />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
