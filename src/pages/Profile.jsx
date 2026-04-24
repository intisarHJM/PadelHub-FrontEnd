import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav"

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!token) return
        const res = await axios.get("http://localhost:3001/auth/session", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUserData(res.data)
      } catch (err) {
        console.error("Error getting the profile data", err)
      }
    }
    getUserData()
  }, [])

  useEffect(() => {
    if (!token) {
      navigate("/sign-in")
    }
  }, [])

  if (!token) {
    return null
  }

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">My Profile</h1>

      <div className="form-card profile-card-wide">
        <div className="profile-header">
          <div className="profile-avatar">
            {userData?.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className="sub-title">{userData?.username}</h2>
        </div>

        <div className="profile-info-grid">
          <div className="input-field">
            <label>Email Address</label>
            <div className="info-display">{userData?.email}</div>
          </div>
          <div className="input-field">
            <label>Phone Number</label>
            <div className="info-display">
              {userData?.phoneNum || "Not provided"}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={() => navigate("/reservation")}
            className="btn btn-secondary"
          >
            My Reservations
          </button>
          <button
            onClick={() => navigate("/purchase-history")}
            className="btn btn-secondary"
          >
            Purchase History
          </button>
          <button
            onClick={() => navigate("/update-password")}
            className="btn btn-primary"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
