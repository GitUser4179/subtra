import { useEffect, useState } from "react"
import { getBillingIntervals } from "./features/billing-intervals/api"
import { getCurrentUser } from "./features/auth/api"
import LoginPage from "./pages/LoginPage"

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
  return (
    <>
      {isCheckingSession ? (
        <p>Checking session...</p>
      ) : user ? (
        <p>Signed in as {user.email}</p>
      ) : (
        <LoginPage onLogin={setUser} />
      )}
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
  )
}

export default App
