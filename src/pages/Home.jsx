import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
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
