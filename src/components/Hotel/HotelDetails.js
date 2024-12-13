import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import "./hotel-detail.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
  } = useFetch(`${BASE_URL}/hotels/${id}`);

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
  } = useFetch(`${BASE_URL}/hotels/rooms/${id}`);

  if (hotelLoading || roomsLoading)
    return <h4 className="text-center pt-5">Loading...</h4>;
  if (hotelError) return <h4 className="text-center pt-5">{hotelError}</h4>;
  if (roomsError) return <h4 className="text-center pt-5">{roomsError}</h4>;

  const handleClick = (id) => {
    if (!user) {
      alert("Please sign in to book the hotel room");
      return;
    }
    navigate(`/hotels/${id}/payment`);
  };

  const formatDescription = (description) => {
    if (!description) return null; // Return null if description is undefined or null
    return description.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <div className="hotel__details">
      {/* Hotel Details Section */}
      <section className="hotel__details-header">
        <div className="hotel__details-image">
          <img src={hotel.photo || "/default-hotel.jpg"} alt={hotel.name} />
        </div>
        <div className="hotel__details-info">
          <h2 className="hotel__details-title">{hotel.name}</h2>
          <p className="hotel-details__address">{hotel.address}</p>
          <p className="hotel__details-description">{formatDescription(hotel.description)}</p>
          <div className="hotel__details-contact">
            <p>
              <strong>Phone:</strong> {hotel.phoneNumber || "Not available"}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <div>
        <h3 className="hotel__rooms-title">Available Rooms</h3>
        {rooms.length > 0 ? (
          <div className="hotel__rooms-list">
            {rooms.map((room) => (
              <div key={room._id} className="hotel__room-id">
                <div className="hotel__room-image">
                  <img
                    src={room.images[0] || "/default-room.jpg"}
                    alt={room.roomType}
                  />
                </div>
                <div className="hotel__room-info">
                  <h5>{room.roomType}</h5>
                  <p>
                    <strong>Square:</strong> {room.square || "Not specified"}
                  </p>
                  <p>
                    <strong>Max Occupancy:</strong> {room.maxOccupancy} people
                  </p>
                  <p>
                    <strong>Price:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN").format(room.price)} VND
                  </p>
                  <p>
                    <strong>Status:</strong> {room.status}
                  </p>
                  <Button
                    className="btn primary__btn hotels__btn"
                    onClick={() => handleClick(room._id)}
                    disabled={room.status === "Unavailable"}
                  >
                    {room.status === "Unavailable"
                      ? "Unavailable"
                      : "Book Room"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="hotel-rooms__no-rooms">
            No rooms available for this hotel.
          </p>
        )}
      </div>
    </div>
  );
};
export default HotelDetails;
