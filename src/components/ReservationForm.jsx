import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Calendar } from "primereact/calendar"

import { InputMask } from "primereact/inputmask"

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
      setFormState(initialState)
      navigate("/reservation") // Move navigation here so it only happens on success
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
      </form>
    </div>
  )
}

export default ReservationForm

