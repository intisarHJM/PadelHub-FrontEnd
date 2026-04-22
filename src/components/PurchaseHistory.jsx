import axios from "axios"
import { useEffect, useState } from "react"
import Nav from "../pages/Nav"

const PurchaseHistory = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const viewHistory = async () => {
      try {
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("userID")

        if (!token) return

        const response = await axios.get(
          `http://localhost:3001/user/purchase-history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setItems(response.data)
      } catch (error) {
        console.error("Error: " + error)
      }
    }

    viewHistory()
  }, [])

  return (
    <div className="page-layout">
      <Nav />
      <h1 className="form-title">Purchase History_</h1>

      <div className="history-list-container">
        {items.length > 0 ? (
          [...items].reverse().map((item) => (
            <div key={item._id} className="history-card-item">
              <div className="history-main-info">
                <h3>{item.toolName}_</h3>
                <p>Purchased on_ <span>{item.createdAt.split("T")[0]}</span></p>
              </div>
              <div className="history-status">
                <span className="qty-pill">Qty: {item.quantity}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="status-msg">No purchase history found_</div>
        )}
      </div>
    </div>
  )
}

export default PurchaseHistory
