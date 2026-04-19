import "./App.css"
import React from "react"
import SignUp from "./pages/SignUp"
import { useState } from "react"
import { Route, Routes } from "react-router"
import Welcome from "./pages/Welcome"

const App = () => {
  return (
    <main>
      <Routes>
         <Route path="/" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
