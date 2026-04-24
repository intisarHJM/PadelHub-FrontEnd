import axios from "axios"
import { useEffect, useState } from "react"
import Nav from "../pages/Nav"
import { useNavigate } from "react-router-dom"

const PurchaseHistory = () => {
  const [items, setItems] = useState([])
  const nav = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const viewHistory = async () => {
      try {
        const id = localStorage.getItem("userID")

        if (!token) return

        const response = await axios.get(
          `https://padelhub-backend-lsre.onrender.com/user/purchase-history/${id}`,
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
      <h1 className="form-title">Purchase History</h1>

      <div className="history-list-container">
        {items.length > 0 ? (
          [...items].reverse().map((item) => (
            <div key={item._id} className="history-card-item">
              <div className="history-main-info">
                <h3>{item.toolName}</h3>
                <p>
                  Purchased on: <span>{item.createdAt.split("T")[0]}</span>
                </p>
              </div>
              <div className="history-status">
                <span className="qty-pill">Qty: {item.quantity}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="status-msg">No purchase history found</div>
        )}
      </div>
    </div>
  )
}

export default PurchaseHistory
