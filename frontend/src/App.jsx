import { useState } from 'react'
import './App.css'
import { getBillingIntervals } from './features/billing-intervals/api'

function App() {
  const [billingIntervals, setBillingIntervals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLoadBillingIntervals(){
    setIsLoading(true)
    setErrorMessage("")
    
    try {
      
      const result = await getBillingIntervals()
      setBillingIntervals(result)
      
    } catch (error){
      
      console.error(error)
      setErrorMessage("Could not load billing intervals, please try again.")

    } finally {
      
      setIsLoading(false)
    }
  }
  return (
    <>
      <button type="button" disabled={isLoading} onClick={handleLoadBillingIntervals}>
        {isLoading ? 'Loading...' : 'Load billing intervals'}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}

      <ul>
        {billingIntervals.map(interval => (
          <li key={interval.id}>
            {interval.name} - {interval.months} month(s)
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
