//view the reservation done by the user
import React, { useState, useEffect } from "react"
import axios from "axios"

const Reservation = () => {
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    const getUserReservation = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found in localStorage")
          return
        }
        const res = await axios.get(
          ` http://localhost:3001/user/reservation/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error("Error getting reservation", err)
      }
    }
  })

  return (
    <div className="reservation-view">
      <h1>my Reservation</h1>
      <div>{userData?.activeReservation && userData.created_At}</div>

    </div>
  )
}
export default Reservation
