import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
// import "./hotel-card.css";
import "../Tour/tour-card.css";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { _id, name, address, active, photo } = hotel;
  const namePreview = name.length > 30 ? name.slice(0, 25) + "..." : name;
  const addressPreview =
    address.length > 35 ? address.slice(0, 30) + "..." : address;
  return (
    <div to={`/hotels/${_id}`} className="tour__card">
      <Link to={`/hotels/${_id}`} className="tour__card">
        <Card>
          <div className="post__img">
            <img src={photo} alt="post-img" />
          </div>

          <CardBody>
            <h5 className="tour__title">
              <p>{namePreview}</p>
            </h5>
            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <p>{addressPreview}</p>
            </div>
            <div>
              <button className="btn booking__btn">
                <Link to={`/hotels/${_id}`}>View Details</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
export default HotelCard;
