import axios from "axios"

const Delete = ({ url, onDeleteSuccess }) => {
  const deleteFunc = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.delete(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 200) {
        if (onDeleteSuccess) {
          onDeleteSuccess()
        }
      }
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  return (
    <button className="delete-btn-action" onClick={() => deleteFunc()}>
      Delete
    </button>
  )
}

export default Delete
