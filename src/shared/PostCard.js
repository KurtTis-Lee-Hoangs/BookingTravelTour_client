import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";

const PostCard = ({ post }) => {
  const { _id, title, images, description } = post;

  // Split the description into words and take the first 4
  const descriptionPreview = description.split(" ").slice(0, 4).join(" ");

  return (
    <Link to={`/posts/${_id}`} className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={images} alt="post-img" />
        </div>

        <CardBody>
          <h5 className="tour__title">
            {/* <Link to={`/tours/${_id}`}>{title}</Link> */}
            <p>{title}</p>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <p>
              {descriptionPreview}...
            </p>

            <button className="btn booking__btn">
              <Link to={`/posts/${_id}`}>Read</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostCard;
