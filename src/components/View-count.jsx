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
        const res = await axios.get(`http://localhost:3001/courts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCourt(res.data.court)
      } catch (error) {
        console.error("Error fetching court:", error)
      }
    }
    fetchCourt()
  }, [id])

  // importance for use at milisecond to work at website
  if (!court) return <div>Loading Court Details...</div>

  return (
    <>
      <div>
        <Nav />
        <div>
          <img src={court.court_img} alt={court.court_id} />
          <h1>{court.court_id}</h1>
          <p>Type: {court.courtType}</p>
          <p>Court Price : {court.price} BHD</p>
        </div>

        <hr />

        <ReservationForm courtId={court._id} price={court.price} />

        <hr />

        <Review court={court} setCourt={setCourt} />
      </div>
    </>
  )
}

export default ViewCount
