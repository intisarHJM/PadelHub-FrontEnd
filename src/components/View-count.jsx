import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Review from "../components/Review"
import Nav from "../pages/Nav"
import ReservationForm from "../components/ReservationForm"

const ViewCount = () => {
  const { id } = useParams()
  const [court, setCourt] = useState(null)

  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `https://padelhub-backend-lsre.onrender.com/courts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setCourt(res.data.court)
      } catch (error) {
        console.error("Error fetching court:", error)
      }
    }
    fetchCourt()
  }, [id])

  if (!court) return <div className="status-msg">Loading Court Details</div>

  return (
    <div className="page-layout">
      <Nav />

      <div className="court-view-container">
        <div className="court-main-card">
          <div className="court-hero-image">
            <img src={court.court_img} alt={court.court_id} />
            <div className="price-overlay">{court.price} BD</div>
          </div>

          <div className="court-header-info">
            <h1 className="form-title">Court {court.court_id}</h1>
            <p className="court-type-tag">
              Type<span>{court.courtType}</span>
            </p>
          </div>

          <div className="reservation-section-wrapper">
            <ReservationForm courtId={court._id} price={court.price} />
          </div>
        </div>

        <div className="reviews-section-wrapper">
          <Review court={court} setCourt={setCourt} />
        </div>
      </div>
    </div>
  )
}

export default ViewCount
