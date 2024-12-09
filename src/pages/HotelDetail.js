import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import "../styles/hotel-detail.css"; // Custom CSS for styling

const HotelDetails = () => {
  const { id } = useParams(); // Get the hotel ID from the URL

  // Fetch hotel details using the ID
  const { data: hotel, loading: hotelLoading, error: hotelError } = useFetch(`${BASE_URL}/hotels/${id}`);

  // Fetch rooms for the hotel using the hotel ID
  const { data: rooms, loading: roomsLoading, error: roomsError } = useFetch(`${BASE_URL}/hotels/rooms/${id}`);

  if (hotelLoading || roomsLoading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (hotelError) return <h4 className="text-center pt-5">{hotelError}</h4>;
  if (roomsError) return <h4 className="text-center pt-5">{roomsError}</h4>;

  return (
    <div className="hotel-details">
      {/* Hotel Details Section */}
      <section className="hotel-details__header">
        <div className="hotel-details__image">
          <img src={hotel.photo || "/default-hotel.jpg"} alt={hotel.name} />
        </div>
        <div className="hotel-details__info">
          <h2 className="hotel-details__title">{hotel.name}</h2>
          <p className="hotel-details__address">{hotel.address}</p>
          <p className="hotel-details__description">{hotel.description}</p>

          <div className="hotel-details__contact">
            <p><strong>Phone:</strong> {hotel.phoneNumber || "Not available"}</p>
          </div>

          <div className="hotel-details__actions">
            <button
              className={`btn ${hotel.active ? "btn-primary" : "btn-disabled"}`}
              disabled={!hotel.active}
            >
              {hotel.active ? "Book Hotel" : "Unavailable"}
            </button>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="hotel-rooms">
        <h3 className="hotel-rooms__title">Available Rooms</h3>
        {rooms.length > 0 ? (
          <div className="hotel-rooms__list">
            {rooms.map((room) => (
              <div key={room._id} className="hotel-room">
                <div className="hotel-room__image">
                  <img src={room.images[0] || "/default-room.jpg"} alt={room.roomType} />
                </div>
                <div className="hotel-room__info">
                  <h5>{room.roomType}</h5>
                  <p><strong>Square:</strong> {room.square || "Not specified"}</p>
                  <p><strong>Max Occupancy:</strong> {room.maxOccupancy} people</p>
                  <p><strong>Price:</strong> {room.price} VND</p>
                  <p><strong>Status:</strong> {room.status}</p>
                  <p><strong>Available Rooms:</strong> {room.availableRooms}</p>
                  <button
                    className={`btn ${room.status === "Available" ? "btn-primary" : "btn-disabled"}`}
                    disabled={room.status !== "Available"}
                  >
                    {room.status === "Available" ? "Book Room" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="hotel-rooms__no-rooms">No rooms available for this hotel.</p>
        )}
      </section>
    </div>
  );
};

export default HotelDetails;
