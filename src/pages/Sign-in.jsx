import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const SignIn = () => {
  const initialState = {
    email: "",
    password: "",
  }
  const [userData, setUserData] = useState(initialState)
  const nav = useNavigate()

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
        "http://localhost:3001/auth/sign-in",
        userData
      )

      localStorage.setItem("token", res.data.token)
      nav("/profile")

      console.log("Success:", res.data)
      setUserData(initialState)
    } catch (err) {
      console.error("Error signing up:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 id="signIn-title">Sign in</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="email"
        id="email"
        onChange={handleChange}
        value={userData.email}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        id="password"
        onChange={handleChange}
        value={userData.password}
      />

      <Link to="/sign-up">Create new Account</Link>
      {/* <a href="/sign-up">create new Account</a> */}
      <button type="submit">Sign in </button>
    </form>
  )
}

export default SignIn
