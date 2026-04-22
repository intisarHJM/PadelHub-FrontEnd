import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Nav from "../pages/Nav"
import Delete from "./Delete-button"

const Reservation = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const getUserReservation = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const id = localStorage.getItem("userID")
      if (!token) {
        setLoading(false)
        return
      }
      const res = await axios.get(
        `http://localhost:3001/user/reservation/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = Array.isArray(res.data) ? res.data : [res.data]
      setReservations(data)
    } catch (error) {
      console.error("Error getting reservation", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserReservation()
  }, [getUserReservation])

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">My Reservations</h1>

      <div className="reservation-grid">
        {loading ? (
          <div className="status-msg">Loading</div>
        ) : reservations && reservations.length > 0 ? (
          [...reservations].reverse().map((res, index) => (
            <div key={res._id || index} className="res-card">
              <div className="res-card-header">
                <h3>
                  Court_ <span>{res.court?.court_id || "N/A"}</span>
                </h3>
                <span className="price-tag">{res.court?.price} BHD</span>
              </div>

              <div className="res-card-body">
                <div className="res-info">
                  <label>Date_</label>
                  <p>
                    {res.date
                      ? new Date(res.date).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
                <div className="res-info">
                  <label>Time_</label>
                  <p>{res.timeSlot || "8:00 PM - 10:00 PM"}</p>
                </div>
                <div className="res-info">
                  <label>Phone_</label>
                  <p>{res.phoneNumber}</p>
                </div>
              </div>

              <div className="res-card-footer">
                <Delete
                  url={`http://localhost:3001/reservations/${res._id}`}
                  onDeleteSuccess={getUserReservation}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="status-msg">No reservations found</div>
        )}
      </div>
    </div>
  )
}

export default Reservation
