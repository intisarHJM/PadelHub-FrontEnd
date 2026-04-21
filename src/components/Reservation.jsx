import React, { useState, useEffect } from "react"
import axios from "axios"

const Reservation = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserReservation = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found")
          setLoading(false)
          return
        }


        const res = await axios.get(`http://localhost:3001/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })


        setReservations(Array.isArray(res.data) ? res.data : [res.data])
        setLoading(false)
      } catch (error) {
        console.error("Error getting reservation", error)
        setLoading(false)
      }
    }

    getUserReservation()
  }, [])
  return (
    <div className="reservation-view">
      <h1>My Reservations</h1>

      <div className="reservation-list">
        {loading ? (
          <p>Loading...</p>
        ) : reservations && reservations.length > 0 ? (

          [...reservations].reverse().map((res, index) => (
            <div key={res._id || index} >
              <h3>Reservation Details:</h3>
              <p>Name: {res.owner?.username }</p>
              <p>Phone: {res.phoneNumber}</p>
              <p>Date Reservation:{res.date ? new Date(res.date).toLocaleDateString() : ""}</p>
              <p>Time Reservation:{res.timeSlot || "8:00 PM - 10:00 PM"}</p>
              <p>Price: ${res.totalPrice}</p>
              <p>Booked on: {res.createdAt?.split('T')[0]}</p>
            </div>
          ))
        ) : (
          <p>No reservations found</p>
        )}
      </div>
    </div>
  )
}

export default Reservation
