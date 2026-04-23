import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav"
import axios from "axios"
import Court from "../components/Court"

const Home = () => {
  // const navigate = useNavigate()4  const nav = useNavigate()
  const nav = useNavigate()
  const [courts, setCourts] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const viewAllCourts = async () => {
      try {
        // const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:3001/courts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCourts(res.data.allCourts)
      } catch (error) {
        console.error("Error fetching courts:", error)
      }
    }
    viewAllCourts()
  }, [])

  useEffect(() => {
    if (!token) {
      nav("/sign-in")
    }
  }, [])

  if (!token) {
    return null
  }

  return (
    <div className="home-container">
      <header className="home-hero">
        <Nav />
        <div className="hero-content">
          <p>Available Padel Courts</p>
        </div>
      </header>

      <main className="courts-section">
        <div className="section-title">
          <h2>Reserve a court below</h2>
          <div className="underline"></div>
        </div>

        <div className="courts-grid">
          {courts.length > 0 ? (
            courts.map((court) => <Court key={court._id} court={court} />)
          ) : (
            <div className="no-courts">
              <p>No courts available at the moment!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
export default Home
