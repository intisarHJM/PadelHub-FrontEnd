<<<<<<< HEAD
import './App.css'
import Nav from './pages/Nav'

=======
import "./App.css"
import React from "react"
import SignUp from "./pages/SignUp"
import { useState } from "react"
import { Route, Routes } from "react-router"
import Welcome from "./pages/Welcome"
>>>>>>> d21a2c6c088d5f68481f185831fae62a0dcd4711

const App = () => {
  return (
<<<<<<< HEAD

    
    <>

    </>
=======
    <main>
      <Routes>
         <Route path="/" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </main>
>>>>>>> d21a2c6c088d5f68481f185831fae62a0dcd4711
  )
}

export default App
