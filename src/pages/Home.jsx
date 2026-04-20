<<<<<<< HEAD
import { useNavigate } from "react-router-dom"
=======
import { useNavigate } from 'react-router-dom'
import Nav from "./Nav"
>>>>>>> 1fbf9f63aaf189868ce7cc914edcd236167042e3

const Home = () => {
  const navigate = useNavigate()

  return (
<<<<<<< HEAD
    <div>
=======
    <div >
      <Nav />
>>>>>>> 1fbf9f63aaf189868ce7cc914edcd236167042e3
      <h1>home </h1>
      <section>
        <button onClick={() => navigate("/Welcome")}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}
export default Home
