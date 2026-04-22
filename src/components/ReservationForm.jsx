import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Calendar } from "primereact/calendar"

const ReservationForm = ({ courtId, price }) => {
  const navigate = useNavigate()

  const initialState = {
    phoneNumber: "",
    date: new Date(),
    timeSlot: "8:00 PM - 10:00 PM",
    totalPrice: price,
    court: courtId,
  }

  const [formState, setFormState] = useState(initialState)

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      totalPrice: price,
      court: courtId
    }))
  }, [price, courtId])

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleDateChange = (e) => {
    setFormState({ ...formState, date: e.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("userID")

    try {
      const response = await axios.post(
        `http://localhost:3001/reservations/${id}`,
        formState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setFormState(initialState)
      navigate("/confirmation", { state: { res: response.data } })
    } catch (error) {
      console.error("Error:", error.response?.data || error.message)
    }
  }

  return (
    <div className="res-form-container">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h3 className="sub-title">Book This Court_</h3>

        <div className="input-field">
          <label>Phone Number_</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number_"
            onChange={handleChange}
            value={formState.phoneNumber}
            required
          />
        </div>

        <div className="input-field">
          <label>Select Date_</label>
          <Calendar
            value={formState.date}
            onChange={handleDateChange}
            dateFormat="mm/dd/yy"
            showIcon
            className="custom-calendar"
          />
        </div>

        <div className="input-field">
          <label>Time Slot_</label>
          <select
            name="timeSlot"
            value={formState.timeSlot}
            onChange={handleChange}
          >
            <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM</option>
            <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
            <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
            <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
            <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
            <option value="9:00 PM - 11:00 PM">9:00 PM - 11:00 PM</option>
          </select>
        </div>

        <div className="price-summary">
          <p>Total Price_ <span>{formState.totalPrice} BHD</span></p>
        </div>

        <button type="submit" className="btn btn-primary">Confirm Reservation_</button>
      </form>
    </div>
  )
}

export default ReservationForm
