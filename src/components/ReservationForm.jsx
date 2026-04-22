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
    timeSlot: "8:00 PM - 10:00 PM", // أضفنا الوقت للحالة الابتدائية
    totalPrice: 30,
    court: courtId,
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
    const id = localStorage.getItem("userID")

    try {
      // تصحيح: قمنا بتعريف المتغير response هنا ليتم استخدامه في الـ navigate
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
      // الآن سيتم إرسال البيانات بنجاح لصفحة التأكيد
      navigate("/confirmation", { state: { res: response.data } })
    } catch (error) {
      console.error("Error:", error.response?.data || error.message)
    }
  }

  return (
    <div>
      <h1>Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formState.name}
        /> */}
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

        <br />
        <label htmlFor="timeSlot">Select a Time:</label>
        {/* تصحيح: ربط الـ select بالـ onChange والـ value لمنع التحذير */}
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

        <p>Price: ${formState.totalPrice}</p>
        <button type="submit">Confirm Reservation</button>
      </form>
    </div>
  )
}

export default ReservationForm
