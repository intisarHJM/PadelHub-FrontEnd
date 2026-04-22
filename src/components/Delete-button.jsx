import axios from "axios"
// import { useNavigate } from "react-router-dom"

const Delete = ({ url }) => {
  // const nav = useNavigate()

  const deleteFunc = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.delete(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log(response)
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          deleteFunc()
        }}
      >
        Delete
      </button>
    </>
  )
}
export default Delete
