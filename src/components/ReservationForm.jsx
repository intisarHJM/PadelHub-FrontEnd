import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Calendar } from "primereact/calendar"


const ReservationForm = ({ courtId }) => {
  const navigate = useNavigate()

  const initialState = {
    name: "",
    phoneNumber: "",
    date: new Date(),
    totalPrice: 30,
    court: courtId
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleDateChange = (e) => {
    setFormState({ ...formState, date: e.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()


    const token = localStorage.getItem("token")

    try {

      await axios.post(`http://localhost:3001/reservations/create`, formState, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setFormState(initialState)

      navigate("/confirmation")
    } catch (error) {
      console.error("Error:", error.response?.data || error.message)

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

        <label htmlFor="select-time">Select a Time:</label>
        <select value=" " >
          <option value="time-6">8:00 PM - 10:00 PM</option>
          <option value="time-5">6:00 PM - 8:00 PM</option>
          <option value="time-4">4:00 PM - 6:00 PM</option>
          <option value="time-3">2:00 PM - 4:00 PM</option>
          <option value="time-2">12:00 PM - 2:00 PM</option>
          <option value="time-1">9:00 PM - 11:00 PM</option>
        </select>

        <p>Price: ${formState.totalPrice}</p>


        <button   type="submit">Confirm Reservation</button>
      </form>
    </div>
  )
}

export default ReservationForm
