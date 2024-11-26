import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import PostCard from "../shared/PostCard";
import NewSletter from "../shared/NewSletter";
import ScrollButton from "../shared/ScrollButton";


const SearchResultListPost = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"Post Search Result"} />
      <section>
        <Container>
          <Row>
            <h2 className="mb-5">Posts By Search</h2>
            {data.length === 0 ? (
              <h2 className="text-center">No posts found</h2>
            ) : (
              data?.map((post) => (
                <Col lg="3" className="mb-4" key={post._id}>
                  <PostCard post={post} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <ScrollButton />
      <NewSletter />
    </>
  );
};

export default SearchResultListPost;
