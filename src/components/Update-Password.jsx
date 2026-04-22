import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UpdatePassword = ({ user }) => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    // confirmPassword: "",
  }

  const [password, setPassword] = useState(initialState)
  navigation = useNavigate()


  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if (password.newPassword !== password.confirmPassword) {
    //   return alert("New passwords do not match!")
    // }

    try {
      const token = localStorage.getItem("token")

      const { oldPassword, newPassword } = password

      const response = await axios.put(
        `http://localhost:3001/auth/update-password/${user.id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPassword(initialState)
      alert("password successfully updated")
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
        {/*
        <label htmlFor="confirmPass"> Confirm password </label>
        <input type="password" id="confirmPass" onChange={handleChange} /> */}
        <button
          type="submit"
          onClick={() =>
            navigation("/profile") && alert("password successfully updated")
          }
        >
          Update
        </button>
      </form>
    </>
  )
}

export default UpdatePassword
