import { useNavigate } from "react-router-dom"

const OrderConfirmed = () => {
  navigation = useNavigate()

  return (
    <div>
      <h1>Thank You For Ordering</h1>
      <p>Congratulations! your order is successfully placed </p>
      <button onClick={() => navigation("/equipment")}>
        Continue Shopping
      </button>
    </div>
  )
}
export default OrderConfirmed
