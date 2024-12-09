import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import "../Tour/tour.css";
import BlogCard from "./BlogCard";
import SearchBlog from "../SearchBlog/SearchBlog";
import NewSletter from "../../shared/NewSletter";
import { Container, Row, Col } from "reactstrap";
import ScrollButton from "../../shared/ScrollButton";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Blogs = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: blogs,
    loading,
    error,
  } = useFetch(`${BASE_URL}/blogs/user/getAllBlogByUser?page=${page}`);

  const { data: blosCount } = useFetch(`${BASE_URL}/blogs/search/getBlogCount`);

  useEffect(() => {
    const pages = Math.ceil(blosCount / 8); // later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, blosCount, blogs]);

  return (
    <>
      <CommonSection title={"All Blogs"} />
      <div>
        <Container>
          <Row>
            <SearchBlog />
          </Row>
        </Container>
      </div>

      <div className="mt-3">
        <Container>
          {loading && <h4 className="text-cente pt-5">Loading......</h4>}
          {error && <h4 className="text-cente pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {blogs?.map((blog) => (
                <Col lg="3" key={blog._id} className="mb-4">
                  <BlogCard blog={blog} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <NewSletter />
      <ScrollButton />
    </>
  );
};

export default Blogs;
