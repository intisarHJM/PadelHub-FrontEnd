import { useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const ReservationForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const initialState = {
    name: "",
    phoneNumber: "",
    date: new Date().toISOString().split('T')[0],
    totalPrice: 30,
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem("token")


      const reservationData = {
        ...formState,
        court: id
      }

      await axios.post(
        `http://localhost:3001/reservations/${id}`,
        reservationData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setFormState(initialState)

      navigate("/reservation")

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
        <p>Total Price: 30$</p>

        <button  onClick={() => navigate("/reservation")}type="submit">Confirm Reservation</button>
      </form>
    </div>
  )
}

export default ReservationForm
