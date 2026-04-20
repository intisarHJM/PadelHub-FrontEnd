import { useState, useEffect } from "react"
import axios from "axios"

const Court = () => {
  // nav = useNavigate
  useEffect(() => {
    const getCourt = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found")
          return
        }

        const response = await axios.post(`http://localhost:3001/courts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log(token)
      } catch (error) {
        console.error("Error: " + error)
      }
    }
  }, [])

  return <></>
}

export default Court
