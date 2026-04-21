import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav"
import axios from "axios"
import Court from "../components/Court"

const Home = () => {
  const navigate = useNavigate()
  const [courts, setCourts] = useState([])

  useEffect(() => {
    const viewAllCourts = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:3001/courts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        // to make sure it run
        console.log(token)
        setCourts(res.data.allCourts)
      } catch (error) {
        console.error("Error fetching courts:", error)
      }
    }
    viewAllCourts()
  }, [])

  return (
    <>
      <div className="home-header">
        <Nav />
        <h1>home </h1>
      </div>

      <div>
        <header>
          <h1>Available Padel Courts</h1>
          <p> Reserve a court is below</p>
        </header>

        <section>
          {courts.length > 0 ? (
            courts.map((court) => <Court key={court._id} court={court} />)
          ) : (
            <p>No courts available!</p>
          )}
        </section>
      </div>
    </>
  )
}
export default Home
