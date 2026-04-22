import { useEffect, useState } from "react"
import axios from "axios"
import Nav from "./Nav"

const Equipment = () => {
  const id = localStorage.getItem("userID")

  //this state for the customer to know what they added to the cart
  const [totals, setTotals] = useState({
    "Padel Gear": 0,
    Balls: 0,
    "Sport T-shirt": 0,
  })

  const initialState = {
    toolName: "first-tool",
    quantity: 1,
  }

  const [equipment, setEquipment] = useState(initialState)
  const [price, setPrice] = useState(0)

  //confirm statutes
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    const updatedEquipment = { ...equipment, [name]: value }

    if (name === "toolName") {
      updatedEquipment.quantity = 1
    }
    setEquipment(updatedEquipment)

    let unitPrice = 0

    if (updatedEquipment.toolName === "first-tool") {
      unitPrice = 2
    } else if (updatedEquipment.toolName === "second-tool") {
      unitPrice = 4
    } else if (updatedEquipment.toolName === "third-tool") {
      unitPrice = 6
    } else {
      unitPrice = 0
    }

    // setPrice(Number(updatedEquipment.quantity) * unitPrice)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      if (!token) return
      await axios.post(
        `http://localhost:3001/equipments/buy/${id}`,
        equipment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setIsConfirmed(true)
    } catch (error) {
      console.error("Error: " + error)
    }
  }

  const addItemToCart = () => {
    let equipmentName = ""
    let unitPrice = 0

    // Identify the item and its price
    if (equipment.toolName === "first-tool") {
      equipmentName = "Padel Gear"
      unitPrice = 2
    } else if (equipment.toolName === "second-tool") {
      equipmentName = "Balls"
      unitPrice = 4
    } else if (equipment.toolName === "third-tool") {
      equipmentName = "Sport T-shirt"
      unitPrice = 6
    }

    // Calculate cost of what is being added NOW
    const addedCost = Number(equipment.quantity) * unitPrice

    // Update the quantities summary
    setTotals({
      ...totals,
      [equipmentName]: totals[equipmentName] + Number(equipment.quantity),
    })

    // ADD the new cost to the existing price (Accumulate)
    setPrice(price + addedCost)

    // Reset the selection area so user can pick something else
    setEquipment({ toolName: "first-tool", quantity: 1 })
  }

  if (isConfirmed) {
    return (
      <div className="page-layout">
        <Nav />

        <div
          className="form-card"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <h1>✅</h1>
          <br />
          <h1>Thank You For Ordering </h1>
          <br />
          <p>Congratulations! Your order is successfully placed.</p>
          <br />
          <p>
            Total Paid: <strong>{price}</strong> BHD
          </p>
          <br />

          <button
            className="update-btn"
            onClick={() => {
              setIsConfirmed(false) // Go back to shop
              setEquipment({ toolName: "first-tool", quantity: 1 }) // Reset form
              setPrice(2)
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">Shop Equipment</h1>

      <div className="equipment-grid">
        <div className="item-card">
          <img
            src="https://i.pinimg.com/736x/9a/ad/00/9aad004125143596006b9d5e7fa4c812.jpg"
            alt="Padel Gear"
          />
          <p>
            Padel Gear<span>2 BHD</span>
          </p>
        </div>
        <div className="item-card">
          <img
            src="https://i.pinimg.com/1200x/01/d2/1c/01d21c0ec16da58631f9752abef887bd.jpg"
            alt="Balls"
          />
          <p>
            Balls <span>4 BHD</span>
          </p>
        </div>
        <div className="item-card">
          <img
            src="https://i.pinimg.com/736x/4d/b8/e1/4db8e1bc3475ff3e3bed3482c5d82736.jpg"
            alt="T-shirt"
          />
          <p>
            T-shirt <span>6 BHD</span>
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h3 className="sub-title">Place Your Order</h3>

        <div className="input-field">
          <label>Select Tool</label>
          <select
            name="toolName"
            onChange={handleChange}
            value={equipment.toolName}
          >
            <option value="first-tool">Padel Gear</option>
            <option value="second-tool">Balls</option>
            <option value="third-tool">Sport T-shirt</option>
          </select>
        </div>

        <div className="input-field">
          <label>Quantity</label>
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
            Total Price: <span>{price} BHD</span>
          </p>
          <div className="order-btns">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addItemToCart}
            >
              Add Item
            </button>
          </div>
        </div>
      </form>

      {/* the cart details */}
      <div className="form-card" style={{ marginTop: "20px" }}>
        <h3 className="sub-title">My Basket 🧺</h3>
        <hr />
        <p>
          Padel Gear: <strong>{totals["Padel Gear"]}</strong> items
        </p>
        <p>
          Balls: <strong>{totals["Balls"]}</strong> items
        </p>
        <p>
          Sport T-shirts: <strong>{totals["Sport T-shirt"]}</strong> items
        </p>
        <br />




        <div className="basket-btns">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setTotals({ "Padel Gear": 0, Balls: 0, "Sport T-shirt": 0 })
            setEquipment({ toolName: "first-tool", quantity: 1 })
            setPrice(0)
          }}
        >
          Reset Card
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Purchase Now
        </button></div>
      </div>
    </div>
  )
}

export default Equipment
