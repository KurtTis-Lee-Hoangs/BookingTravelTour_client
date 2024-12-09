import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../Tour/tour-card.css";

const BlogCard = ({ blog }) => {
  const { _id, title, image, description } = blog;

  // Split the description into words and take the first 4
  // const descriptionPreview = description.split(" ").slice(0, 6).join(" ");
  // const titlePreview = title.split(" ").slice(0, 7).join(" ");
  const titlePreview = title.length > 50 ? title.slice(0, 50) + "..." : title;
  const descriptionPreview = description.length > 50 ? description.slice(0, 50) + "..." : description;
  return (
    <div to={`/blogs/${_id}`} className="tour__card">
      <Link to={`/blogs/${_id}`} className="tour__card">
        <Card>
          <div className="post__img">
            <img src={image} alt="post-img" />
          </div>

          <CardBody>
            <h5 className="tour__title">
              {/* <Link to={`/tours/${_id}`}>{title}</Link> */}
              {/* <p>{title}</p> */}
              <p>{titlePreview}</p>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <p>{descriptionPreview}</p>

              {/* <button className="btn booking__btn">
                <Link to={`/blogs/${_id}`}>Read</Link>
              </button> */}
            </div>
            <div>
              <button className="btn booking__btn">
                <Link to={`/blogs/${_id}`}>Read Now</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default BlogCard;
