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

        if (!token) {
          console.error("No token found")
          return
        }

        const response = await axios.get(
          `http://localhost:3001/user/purchase-history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(items)
        console.log(response)
        setItems(response.data)
      } catch (error) {
        console.error("Error: " + error)
      }
    }

    viewHistory()
  }, [])

  return (
    <>
      <Nav />
      <h1>purchase</h1>

      {items.map((item) => (
        <ul key={item._id}>
          <li>
            {item.quantity} {item.toolName}, purchased at{" "}
            {item.createdAt.split("T")[0]}
          </li>
        </ul>
      ))}
    </>
  )
}

export default PurchaseHistory
