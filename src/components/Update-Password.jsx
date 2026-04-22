import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Nav from "../pages/Nav"

const UpdatePassword = () => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
  }

  const [password, setPassword] = useState(initialState)
  const navigate = useNavigate()
  const id = localStorage.getItem("userID")

  

  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const { oldPassword, newPassword } = password

      await axios.put(
        `http://localhost:3001/auth/update-password/${id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPassword(initialState)
      alert("Password successfully updated_")
      navigate("/profile")
    } catch (error) {
      console.log("Error: " + error)
    }
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
