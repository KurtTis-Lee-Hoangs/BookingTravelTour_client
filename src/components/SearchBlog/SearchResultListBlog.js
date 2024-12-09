import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import BlogCard from "../Blog/BlogCard";
import NewSletter from "../../shared/NewSletter";
import ScrollButton from "../../shared/ScrollButton";


const SearchResultListBlog = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"Blos Search Result"} />
      <section>
        <Container>
          <Row>
            <h2 className="mb-5">Blogs By Search</h2>
            {data.length === 0 ? (
              <h2 className="text-center">No blog found</h2>
            ) : (
              data?.map((blog) => (
                <Col lg="3" className="mb-4" key={blog._id}>
                  <BlogCard blog={blog} />
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

export default SearchResultListBlog;
