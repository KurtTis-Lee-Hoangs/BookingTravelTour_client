import React, { useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import NewSletter from "../shared/NewSletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const PostDetails = () => {
  const { id } = useParams();

  // fetch data from database
  const { data: post, loading, error } = useFetch(`${BASE_URL}/posts/${id}`);

  // destructure properties from post object
  const {
    title,
    images,
    description
  } = post || {};  // Ensure post is not undefined

  // Function to convert \n to <br /> for line breaks
  const formatDescription = (description) => {
    if (!description) return null; // Return null if description is undefined or null
    return description.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col>
                <div className="tour__content">
                  <img src={images} alt="post-image" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    {/* <h5>Description</h5> */}
                    <p>{formatDescription(description)}</p>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <NewSletter />
    </>
  );
};

export default PostDetails;
