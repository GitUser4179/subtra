import { Link } from "react-router"

export default function NotFoundPage() {
  return (
    <>
      <h1>404, page not found.</h1>
      <Link to="/">Return to home.</Link>
    </>
  )
}
