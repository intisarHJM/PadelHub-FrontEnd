import { useNavigate } from "react-router-dom"
const Confirmation =()=>{
const nav = useNavigate()
  return(
<div className="confirm-page">
    <h1>Suseccful Reservation ✅ </h1>
    <p>Date: </p>
    <button onClick={()=>nav()}></button>
</div>
  )
}
