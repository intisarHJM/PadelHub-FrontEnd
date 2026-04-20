 import { useState ,useEffect } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Court from "./Court"

 const ReservationForm =({res,setRes})=> {
  const navigate=userNavigate()

  const initialState={
     name :'',
     PhoneNumber:''

  }

  const [formState, setFormState] = useState(initialState)
  const [courts , setCourts]=useState([])


  useEffect(()=>{

const getData=async()






  })


const handleSubmit = async (event) => {
  event.preventDefault()
  const response = await axios.post('http://localhost:3001/reserv', formState)
  let resList = [...res]
  resList.push(response.data)
  setRes(issuesRes)
  setFormState(initialState)
}

   const handleChange = (event) => {
  setFormState({ ...formState, [event.target.name]: event.target.value })
}


  return(
 <form onSubmit={handleSubmit}>
  <label htmlFor="text"> Name :</label>
   <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formState.date}
        />
   <label htmlFor="phone-number"> Phone Number:</label>

        <input
          type="number"
          name="phone-number"
          onChange={handleChange}
          value={formState.price}
          autoComplete="off"
        />


        <button type="submit"> Confirm Reservation  </button>
</form>
  )

 }
 export default ReservationForm
