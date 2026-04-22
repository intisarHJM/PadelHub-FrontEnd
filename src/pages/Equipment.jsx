import { useEffect, useState } from "react"
import axios from "axios"
import Nav from "./Nav"
import { useNavigate } from "react-router-dom"

const Equipment = () => {
  const id = localStorage.getItem("userID")
  let initialState = {
    toolName: "Padel-gear",
    quantity: 1,
  }
  const nav = useNavigate()
  const token = localStorage.getItem("token")

  const [equipment, setEquipment] = useState(initialState)
  const [price, setPrice] = useState(2)

  // 1. Simplify handleChange to only update the state
  const handleChange = (event) => {
    const { name, value } = event.target
    setEquipment({ ...equipment, [name]: value })
  }

  // 2. Add useEffect to "watch" equipment and update price automatically
  useEffect(() => {
    const calculatePrice = () => {
      let unitPrice = 0

      if (equipment.toolName === "Padel-gear") unitPrice = 2
      else if (equipment.toolName === "Balls") unitPrice = 4
      else if (equipment.toolName === "Sport-T-shirt") unitPrice = 6

      setPrice(unitPrice * Number(equipment.quantity))
    }

    calculatePrice()
  }, [equipment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const token = localStorage.getItem("token")
      if (!token) return
      await axios.post(
        `http://localhost:3001/equipments/buy/${id}`,
        equipment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      alert("Order Placed Successfully_")
    } catch (error) {
      console.error("Error: " + error)
    }
  }

  useEffect(() => {
    if (!token) {
      nav("/sign-in")
    }
  }, [])

  if (!token) {
    return null
  }

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">Shop Equipment_</h1>

      <div className="equipment-grid">
        <div className="item-card">
          <img
            src="https://i.pinimg.com/736x/9a/ad/00/9aad004125143596006b9d5e7fa4c812.jpg"
            alt="Padel Gear"
          />
          <p>
            Padel Gear_ <span>2 BHD</span>
          </p>
        </div>
        <div className="item-card">
          <img
            src="https://i.pinimg.com/1200x/01/d2/1c/01d21c0ec16da58631f9752abef887bd.jpg"
            alt="Balls"
          />
          <p>
            Balls_ <span>4 BHD</span>
          </p>
        </div>
        <div className="item-card">
          <img
            src="https://i.pinimg.com/736x/4d/b8/e1/4db8e1bc3475ff3e3bed3482c5d82736.jpg"
            alt="T-shirt"
          />
          <p>
            T-shirt_ <span>6 BHD</span>
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h3 className="sub-title">Place Your Order_</h3>

        <div className="input-field">
          {/* <label>Select Tool_</label>
          <select name="toolName" onChange={handleChange} value={equipment.toolName}>
            <option value="first-tool">Padel Gear</option>
            <option value="second-tool">Balls</option>
            <option value="third-tool">Sport T-shirt</option>
          </select> */}
        </div>
        <label htmlFor="toolName" onChange={handleChange}>
          Tool
        </label>
        <select name="toolName" onChange={handleChange} id="toolName">
          <option value="" disabled defaultValue></option>
          <option value="Padel-gear">Padel Gear</option>
          <option value="Balls">Balls</option>
          <option value="Sport-T-shirt">Sport T-shirt</option>
        </select>

        <div className="input-field">
          <label>Quantity_</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={equipment.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="total-section">
          <p>
            Total Price_ <span>{price} BHD</span>
          </p>
          <button type="submit" className="btn btn-primary">
            Purchase Now_
          </button>
        </div>
      </form>
    </div>
  )
}

export default Equipment
