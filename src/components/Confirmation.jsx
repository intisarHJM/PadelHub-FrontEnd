import { useNavigate, useLocation } from "react-router-dom"
import Nav from "../pages/Nav"

const Confirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const res = location.state?.res

  if (!res) {
    return (
      <div className="page-layout">
        <Nav />
        <h1 className="form-title">No Reservation Found_</h1>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Go Home_</button>
      </div>
    )
  }

  return (
    <div className="page-layout">
      <Nav />

      <div className="form-card confirm-card">
        <div className="success-icon">✅</div>
        <h1 className="sub-title">Successful Reservation_</h1>

        <div className="confirm-details-list">
          <div className="confirm-item">
            <label>Name</label>
            <p>{res.owner?.username || "Guest"}</p>
          </div>
          <div className="confirm-item">
            <label>Phone</label>
            <p>{res.phoneNumber}</p>
          </div>
          <div className="confirm-item">
            <label>Court Name</label>
            <p>{res.court?.court_id || "N/A"}</p>
          </div>
          <div className="confirm-item">
            <label>Reservation Date</label>
            <p>{new Date(res.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={() => navigate("/reservation")}>
            View My Reservations
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
