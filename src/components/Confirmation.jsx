import { useNavigate } from "react-router-dom"
import Nav
 from "../pages/Nav"
const Confirmation =()=>{
const nav = useNavigate()
  return(
<div className="confirm-page">
<Nav />
    <h1>Suseccful Reservation ✅ </h1>
    <p>Date: </p>
    <button onClick={()=>nav()}></button>
</div>
  )
}

export default Confirmation
