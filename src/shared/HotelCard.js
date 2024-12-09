import React from "react";
import { useNavigate } from "react-router-dom";
import "../shared/hotel-card.css"; // CSS for hotel cards

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { _id, name, address, active, photo } = hotel; // Extract the relevant data from hotel

  return (
    <div className="hotel-card">
      <div className="hotel-card__image">
        {/* Display hotel image, use default if not available */}
        <img src={photo || "/default-hotel.jpg"} alt={name} />
        {/* Show "Inactive" if hotel is not active */}
        {!active && <span className="hotel-card__status">Inactive</span>}
      </div>
      <div className="hotel-card__info">
        <h5>{name}</h5>
        <p>{address}</p>
        <button
          className={`btn ${active ? "btn-primary" : "btn-disabled"}`} // Button styling based on hotel status
          onClick={() => navigate(`/hotels/${_id}`)} // Navigate to hotel details page
          disabled={!active} // Disable button if hotel is inactive
        >
          {active ? "View Details" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
