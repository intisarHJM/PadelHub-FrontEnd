import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav"
import PurchaseHistory from "../components/PurchaseHistory"

const Profile = () => {
  // no need for this code
  // const handleChange = () => {
  //   setUserData({ ...userData, [event.target.name]: event.target.value })
  // }

  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getUserData = async () => {
      try {
        //this takes the token from the storage
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found in localStorage")

          return
        }
        const res = await axios.get("http://localhost:3001/auth/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // console.log("Profile Data:", res.data)

        setUserData(res.data)
      } catch (err) {
        console.error("Error getting the profile data", err)
      }
    }
    getUserData()
  }, [])

  return (
    <main className="profile-main">
      <Nav />
      <h1>{userData?.username}'s profile</h1>
      <h3>E-mail: {userData?.email}</h3>
      <h3>phone: {userData?.phoneNum}</h3>

      <div className="userProfile-buttons">
        <button onClick={() => navigate("/reservation")} type="button">
          Reservations
        </button>
        <button type="button" onClick={() => navigate("/update-password")}>
          update password
        </button>
        <button type="button" onClick={() => navigate("/purchase-history")}>
          purchase
        </button>
      </div>
    </main>
  )
}

export default Profile
