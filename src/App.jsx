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
          {user ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </>
          ) : (
            <Route path="/" element={<Welcome />} />
          )}

          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/sign-in"
            element={<SignIn setUser={setUser} user={user} />}
          />
        </Routes>
      </main>
    </>
  )
}
export default App
