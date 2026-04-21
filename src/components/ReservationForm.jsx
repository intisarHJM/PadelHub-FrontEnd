import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const ReservationForm = () => {
  const navigate = useNavigate()
  const initialState = {
    name: "",
    phoneNumber: "",
    date: new Date(),
    totalPrice: 30,
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  // Specific handler for the Calendar since it doesn't use standard event.target
  const handleDateChange = (e) => {
    setFormState({ ...formState, date: e.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/reservations", formState)

>>>>>>> 4ef2dc0e26d3e4757805ae708e0e7f7cfee901c6
      setFormState(initialState)
    } catch (error) {
      console.error("Error creating reservation:", error.response?.data?.message || error.message)

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
          required
        />
        <br />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          onChange={handleChange}
          value={formState.phoneNumber}
          required
        />
        <br />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={formState.date}
          required
        />
<<<<<<< HEAD
        <br />
        <Calendar
          value={formState.date}
          onChange={handleDateChange}
          dateFormat="mm/dd/yy"
          showIcon
        />
        <p>Duration: 5AM - 5PM</p>
        <p>Price: ${formState.totalPrice}</p>
        <button type="submit">Confirm Reservation</button>
=======
        <p>Total Price: 30$</p>
        <button onClick={() => navigate("/reservation")} type="submit">
          Confirm Reservation
        </button>
      </form>
    </div>
  )
}

export default ReservationForm
