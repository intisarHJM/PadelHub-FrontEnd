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
    <div className="reviews-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h3 className="sub-title">Add Review_</h3>

        <div className="input-field">
          <label>Description_</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your experience here_"
          />
        </div>

        <div className="input-field">
          <label>Rating_</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ </option>
            <option value="4">⭐⭐⭐⭐ </option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐ </option>
            <option value="1">⭐</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Send Review_</button>
      </form>

      <div className="reviews-list-section">
        <h3 className="sub-title">Reviews List_</h3>
        {reviews && reviews.length > 0 ? (
          [...reviews].reverse().map((rev, index) => (
            <div key={rev._id || index} className="review-item-card">
              <div className="review-card-header">
                <span className="stars-display">{"⭐".repeat(Number(rev.rating))}</span>
                <span className="review-date">{rev.createdAt?.split("T")[0]}</span>
              </div>
              <p className="review-text">{rev.description}</p>
            </div>
          ))
        ) : (
          <p className="status-msg">No reviews yet_</p>
        )}
      </div>
    </div>
  )
}

export default Review
