import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUp = () => {

   const navigate =useNavigate()
  const initialState = {
    username: "",
    password: "",
    phoneNum: "",
    email: "",
  }
  const [userData, setUserData] = useState(initialState)

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
      setUserData(initialState)
    } catch (err) {
      console.error("Error signing up:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 id="signUp-title">Sign up</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={userData.username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={userData.password}
      />
      <label htmlFor="phoneNumber">phone number</label>
      <input
        type="text"
        name="phoneNum"
        placeholder="phoneNumber"
        onChange={handleChange}
        value={userData.phoneNum}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}
        value={userData.email}
      />

      <a href="/sign-in">Already have an account?</a>
      <button  onClick={()=>navigate('/Sign-in')}>Register</button>
    </form>
  )
}

export default SignUp
