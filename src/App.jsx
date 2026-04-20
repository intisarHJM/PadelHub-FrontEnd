import "./App.css"
import React from "react"
import SignUp from "./pages/SignUp"
import { useState } from "react"
import { Route, Routes } from "react-router"
import Welcome from "./pages/Welcome"
import Profile from "./pages/Profile"
import SignIn from "./pages/Sign-in"
import Home from "./pages/Home"
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
  )
}

export default App
