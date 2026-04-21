import { useNavigate, useLocation } from "react-router-dom"
import Nav from "../pages/Nav"

const Confirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const res = location.state?.res

  if (!res) {
    return (
      <div className="confirm-page">
        <Nav />
        <h1>No Reservation Found</h1>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    )
  }

  return (
    <div className="confirm-page">
      <Nav />
      <h1>Successful Reservation ✅</h1>
      <div className="details">
        <p>Name:{res.owner?.username || "Guest"}</p>
        <p>Phone: {res.phoneNumber}</p>
        <p>court name: {res.court.court_id}</p>
        <p>Date Reservation : {new Date(res.date).toLocaleDateString()}</p>
      </div>
      <button onClick={() => navigate("/reservation")}>
        View All My Reservations
      </button>
    </div>
  )
}

export default Confirmation
