import React, { useState, useEffect } from "react"
import axios from "axios"

const Profile = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/session")
        setUserData(res.data)
      } catch (err) {
        console.error("Error data:", err)
      }
    }
    getUserData()
  }, [setUserData])


console.log(userData.data.email)



  return <main></main>
}

export default Profile
