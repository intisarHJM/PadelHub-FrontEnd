import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const SignIn = ({ setUser, user }) => {
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
      console.log("res: ", res)

      console.log(res.data.token)
      nav("/home")

      console.log("Success:", res.data)
      // setUserData(initialState)
    } catch (err) {
      console.error("Error signing up:", err)
      alert("Wrong email or password")
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

      <a href="/sign-up">create new Account</a>
      <button disabled={!userData.email || !userData.password}>Sign in</button>

      {}
    </form>
  )
}

export default SignIn
