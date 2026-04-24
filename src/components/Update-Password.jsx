import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Nav from "../pages/Nav"

const UpdatePassword = ({ user }) => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const [password, setPassword] = useState(initialState)
  const navigation = useNavigate()

  const id = localStorage.getItem("userID")
  const token = localStorage.getItem("token")

  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.newPassword === password.confirmPassword) {
      try {
        const { oldPassword, newPassword } = password

        const response = await axios.put(
          `https://padelhub-backend-lsre.onrender.com/auth/update-password/${id}`,
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setPassword(initialState)
        alert("password successfully updated")
      } catch (error) {
        console.log("Error: " + error)
      }
    } else {
      return alert("New passwords do not match!")
    }
  }

  useEffect(() => {
    if (!token) {
      navigation("/sign-in")
    }
  }, [])

  if (!token) {
    return null
  }

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">Update Password</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="oldPass">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPass"
            placeholder="Enter old password"
            onChange={handleChange}
            value={password.oldPassword}
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="newPass">New Password</label>
          <input
            type="password"
            id="newPass"
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            value={password.newPassword}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Now
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword
