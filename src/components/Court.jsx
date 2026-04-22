import { Link } from "react-router-dom"
// props from the home
const Court = ({ court }) => {
  if (!court) return null

  return (
    <div className="court-card">
      <img src={court.court_img} alt={court.courtType} />
      <div className="court-details">
        <h3>Court name : {court.court_id}</h3>
        {/* maybe we will need it later */}
        {/* <p>Type: {court.courtType}</p>
        <p>Price: {court.price} BHD</p> */}

        <Link to={`/courts/${court._id}`}>
          <button id="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default Court
