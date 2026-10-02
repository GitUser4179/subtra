import { useEffect, useState } from "react"
import { getBillingIntervals } from "./features/billing-intervals/api"
import { getCurrentUser, logout } from "./features/auth/api"
import { Link, Routes, Route, Navigate } from "react-router"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import CategoriesPage from "./pages/CategoriesPage"
import SubscriptionsPage from "./pages/SubscriptionsPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  const [billingIntervals, setBillingIntervals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

  async function handleLoadBillingIntervals() {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const result = await getBillingIntervals()
      setBillingIntervals(result)
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not load billing intervals, please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) return <p>Checking session...</p>
  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <>
              <p>Signed in as {user.email}</p>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/subscriptions">Subscriptions</Link>
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
              <button type="button" disabled={isLoading} onClick={handleLoadBillingIntervals}>
                {isLoading ? "Loading..." : "Load billing intervals"}
              </button>
              {errorMessage && <p role="alert">{errorMessage}</p>}
              <ul>
                {billingIntervals.map((interval) => (
                  <li key={interval.id}>
                    {interval.name} - {interval.months} month(s)
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={setUser} />}
      />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="categories"
        element={user ? <CategoriesPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="subscriptions"
        element={user ? <SubscriptionsPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App
