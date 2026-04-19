import React, { useState } from "react"
import axios from "axios"

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/sign-up",
        userData
      )
      console.log("Success:", res.data)
    } catch (err) {
      console.error("Error signing up:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 id="signUp-title">Sign up</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}
        value={userData.email}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={userData.password}
      />

      <a href="/sign-in">Already have an account?</a>
      <button type="submit">Register</button>
    </form>
  )
}

export default SignUp
