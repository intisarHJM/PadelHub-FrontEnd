import "./App.css"
import React from "react"
import SignUp from "./pages/SignUp"
import { useState } from "react"
import { Route, Routes } from "react-router"
import Welcome from "./pages/Welcome"
import Profile from "./pages/Profile"
import SignIn from "./pages/Sign-in"
import Home from "./pages/Home"
import About from "./pages/About"
import ReservationForm from "./components/ReservationForm"
import Reservation from "./components/Reservation"
import Review from "./components/Review"
import Court from "./components/Court"
import ViewCount from "./components/View-count"

const App = () => {
  const initialState = {
    email: "",
    password: "",
  }
  const [user, setUser] = useState(initialState)

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {user ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/courts" element={<Court />} />
              <Route path="/courts/:id" element={<ViewCount />} />
            </>
          ) : (
            <Route path="/" element={<Welcome />} />
          )}

          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/sign-in"
            element={<SignIn setUser={setUser} user={user} />}
          />
          <Route path="/reservationForm" element={<ReservationForm />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/court-reviews/:id" element={<Review />} />
        </Routes>
      </main>
    </>
  )
}
export default App
