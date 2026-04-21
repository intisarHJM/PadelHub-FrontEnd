import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Nav from "./Nav"

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
    <Nav />
      <form onSubmit={handleSubmit}>
        <h1>Buy Tools!</h1>

        <label htmlFor="toolName" onChange={handleChange}>
          Tool
        </label>
        <select name="toolName" onChange={handleChange} id="toolName">
          <option value="first-tool">tool 1</option>
          <option value="second-tool">tool 2</option>
          <option value="third-tool">tool 3</option>
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
