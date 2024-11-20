import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import PostCard from "../shared/PostCard";
import SearchPost from "../shared/SearchPost";
import NewSletter from "../shared/NewSletter";
// import tourData from "../assets/data/tours";
import { Container, Row, Col } from "reactstrap";
import ScrollButton from "../shared/ScrollButton";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: posts,
    loading,
    error,
  } = useFetch(`${BASE_URL}/posts/user/getAllPostByUser?page=${page}`);

  const { data: postCount } = useFetch(`${BASE_URL}/posts/search/getPostCount`);

  useEffect(() => {
    const pages = Math.ceil(postCount / 8); // later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, postCount, posts]);

  return (
    <>
      <CommonSection title={"All Posts"} />
      <section>
        <Container>
          <Row>
            <SearchPost />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-cente pt-5">Loading......</h4>}
          {error && <h4 className="text-cente pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {posts?.map((post) => (
                <Col lg="3" key={post._id} className="mb-4">
                  <PostCard post={post} />
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
      </section>
      <NewSletter />
      <ScrollButton />
    </>
  );
};

export default Tours;
