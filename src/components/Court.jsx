import React from "react";
import { Link } from "react-router-dom";

const Court = ({ court }) => {
  if (!court) return null;

  return (
    <div className="court-card">
      <img
        src={court.court_img}
        alt={court.courtType || "Court"}
      />

      <div className="court-details">
        <h3>
          COURT <span>{court.court_id}</span>
        </h3>

        <Link to={`/courts/${court._id}`} style={{ textDecoration: 'none' }}>
          <button id="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Court;
