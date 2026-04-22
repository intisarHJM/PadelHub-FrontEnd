import { useState } from "react"
import axios from "axios"

const UpdatePassword = () => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
  }

  const [password, setPassword] = useState(initialState)


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
      const id = localStorage.getItem("user._id")

      const response = await axios.post(
        `http://localhost:3001/auth/update-password/${id}`,{
        password},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPassword("")

      console.log(id)
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  return (
    <>
      <h1>Update password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPass"> Old password </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPass"
          onChange={handleChange}
        />

        <label htmlFor="newPass"> New password </label>
        <input
          type="password"
          id="newPass"
          name="newPassword "
          onChange={handleChange}
        />

        <label htmlFor="confirmPass"> Confirm password </label>
        <input type="password" id="confirmPass" onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </>
  )
}

export default UpdatePassword
