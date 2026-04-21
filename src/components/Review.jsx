import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Review = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(5)

  useEffect(() => {
    const getReviews = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`http://localhost:3001/courts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setReviews(res.data.reviews || [])
      } catch (err) {
        console.log("Error:", err)
      }
    }
    if (id) getReviews()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")

      const newReviewData = {
        description: description,
        rating: Number(rating),
      }

      const res = await axios.post(
        `http://localhost:3001/courts/${id}/reviews`,
        newReviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setReviews(res.data.court.reviews)
      setDescription("")
      setRating(5)
    } catch (err) {
      console.error("Error:", err.response?.data)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Review</h3>
        <label htmlFor="description">Add the Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="add the description"
        />
        <br />
        <label htmlFor="select-rating">Select a Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">⭐⭐⭐⭐⭐ </option>
          <option value="4">⭐⭐⭐⭐ </option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐ </option>
          <option value="1">⭐</option>
        </select>
        <button type="submit">Send Review</button>
      </form>

      <h3>Reviews List:</h3>
      {reviews && reviews.length > 0 ? (
        [...reviews].reverse().map((rev, index) => (
          <div key={rev._id || index}>
            <p>Description: {rev.description}</p>
            <p>Rating: {"⭐".repeat(Number(rev.rating))}</p>
            <p>{rev.createdAt?.split("T")[0]}</p>
          </div>
        ))
      ) : (
        <p>No reviews </p>
      )}
    </div>
  )
}

export default Review
