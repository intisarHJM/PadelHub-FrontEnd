import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const SignIn = ({ setUser }) => {
  const initialState = {
    email: "",
    password: "",
  }

  const [userData, setUserData] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")
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
      localStorage.setItem("userID", res.data.user.id)

      setUser(res.data.user)
      nav("/home")
    } catch (err) {
      console.error("Error signing in:", err)
      alert("Wrong email or password")
    }
  }

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 id="signIn-title">Sign in</h1>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              id="email"
              onChange={handleChange}
              value={userData.email}
              required
            />



            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              id="password"
              onChange={handleChange}
              value={userData.password}
              required
            />
          </div>

        <Link to="/sign-up" className="signup-link">
          Create new account
        </Link>

        <button
          type="submit"
          className="signin-button"
          disabled={!userData.email || !userData.password}
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignIn
