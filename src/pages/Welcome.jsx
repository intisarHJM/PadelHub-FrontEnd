import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to PadlHub</h1>
      <button onClick={() => navigate("/Sign-in")}>Login</button>
      <button onClick={() => navigate("/Sign-up")}>Sign-up</button>
    </div>
  )
}
export default Welcome
