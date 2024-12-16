import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { avgRating, totalRating } = calculateAvgRating(reviews);
  const formattedPrice = price.toLocaleString("vi-VN");
  const cityPreview = city.split(" ").slice(0, 5).join(" ");
  const previewWithEllipsis = city.split(" ").length > 5 ? `${cityPreview}...` : cityPreview;
  const titlePreview = title.length > 30 ? title.slice(0, 30) + "..." : title;

  return (
    <div to={`/tours/${_id}`} className="tour__card">
      <Link to={`/tours/${_id}`} className="tour__card">
        <Card>
          <div className="tour__img">
            <img src={photo} alt="tour-img" />
            {/* {featured && <span className="ribbon__tour">Featured Tour</span>} */}
            {featured && <span className="ribbon__tour">Foreign Tour</span>}
          </div>

          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i class="ri-map-pin-line"></i> {previewWithEllipsis}
              </span>

              <span className="tour__rating d-flex align-items-center gap-1">
                <i class="ri-star-fill"></i>{" "}
                {calculateAvgRating === 0 ? null : avgRating}
                {totalRating === 0 ? (
                  "Not rated"
                ) : (
                  <span>({reviews.length})</span>
                )}
              </span>
            </div>

            <h5 className="tour__title">
              {/* <Link to={`/tours/${_id}`}>{title}</Link> */}
              <p>{titlePreview}</p>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h6>
                {formattedPrice} VND <span> /person</span>
              </h6>

              {/* <button className="btn booking__btn">
                <Link to={`/tours/${_id}`}>Book Now</Link>
              </button> */}
            </div>
            <div>
              <button className="btn booking__btn">
                <Link to={`/tours/${_id}`}>Book Now</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TourCard;
