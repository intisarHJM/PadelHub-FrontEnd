import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../App.css"

const Equipment = () => {
  // const { id } = useParams()

  const id = localStorage.getItem("userID")

  let initialState = {
    // userId: id,
    toolName: "",
    quantity: 1,
  }

  const [equipment, setEquipment] = useState(initialState)

  const handleChange = (event) => {
    setEquipment({ ...equipment, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        console.error("No token found")
        return
      }

      const response = await axios.post(
        `http://localhost:3001/equipments/buy/${id}`,
        equipment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      console.log(token)
      console.log(token.id)
    } catch (error) {
      console.error("Error: " + error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Buy Tools!</h1>
        <div className="equipments-images">
          <img id="racket"
            src="https://i.pinimg.com/736x/9a/ad/00/9aad004125143596006b9d5e7fa4c812.jpg"
            alt="Padel Gear"
          />
          <img
            src="https://i.pinimg.com/1200x/01/d2/1c/01d21c0ec16da58631f9752abef887bd.jpg"
            alt="Padel Balls"
          />
          <img
            src="https://i.pinimg.com/736x/4d/b8/e1/4db8e1bc3475ff3e3bed3482c5d82736.jpg"
            alt="Sport t-shirt"
          />
        </div>
        <label htmlFor="toolName" onChange={handleChange}>
          Tool
        </label>
        <select name="toolName" onChange={handleChange} id="toolName">
          <option value="first-tool">Padel Gear</option>
          <option value="second-tool">Balls</option>
          <option value="third-tool">Sport t-shirt</option>
        </select>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>

      </form>
    </>
  )
}

export default Equipment
