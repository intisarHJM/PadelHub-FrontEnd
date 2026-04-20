import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const ReservationForm = () => {
  const navigate = useNavigate()
  const initialState = {
    name: '',
    phoneNumber: '',
    date: new Date(),
    totalPrice: 30
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3001/reservations', formState)
    
      setFormState(initialState)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div>
      <h1>Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formState.name}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          onChange={handleChange}
          value={formState.phoneNumber}
        />
        <p>Total Price: 30$</p>
        <button  onClick={()=>navigate('/reservation')}  type="submit">
          Confirm Reservation</button>
      </form>
    </div>
  )
}

export default ReservationForm
