import React, { useState, useEffect } from "react";
import TourFeatured from "./TourFeatured";
import { Col, Row } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const DomesticTours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getDomesticTours?page=${page}`);

  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getDomesticToursCount`);

  // console.log(featuredTours);
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8); // later we will use backend data count
    setPageCount(pages);
    // window.scrollTo(0, 0);
  }, [page, tourCount, featuredTours]);

  return (
    <>
      {loading && <h4>Loading.........</h4>}
      {error && <h4>{error}</h4>}
      <Row>
        {!loading &&
          !error &&
          featuredTours?.map((tour) => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
              <TourFeatured tour={tour} />
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
    </>
  );
};

export default DomesticTours;
