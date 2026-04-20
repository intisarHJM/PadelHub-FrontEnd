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
  {
  }

  return (
    <>



      <main>
        <Routes>
           <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
