import "./App.css"
import React from "react"
import SignUp from "./pages/SignUp"
import { useState } from "react"
import { Route, Routes } from "react-router"
import Welcome from "./pages/Welcome"
import Profile from "./pages/Profile"
import SignIn from "./pages/Sign-in"
import Home from "./pages/Home"
<<<<<<< HEAD
import Court from "./components/Court"

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courts" element={<Court />} />
      </Routes>
    </main>
=======
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
>>>>>>> 1fbf9f63aaf189868ce7cc914edcd236167042e3
  )
}
export default App
