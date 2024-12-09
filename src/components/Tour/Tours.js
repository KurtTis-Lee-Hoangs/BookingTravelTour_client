import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import "./tour.css";
import TourCard from "./TourCard";
import SearchBar from "../SearchTour/SearchBar";
import NewSletter from "../../shared/NewSletter";
import { Container, Row, Col } from "reactstrap";
import ScrollButton from "../../shared/ScrollButton";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours/user/getAllTourByUser?page=${page}`);

  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 16); // later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <div>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </div>

      <div className="mt-5">
        <Container>
          {loading && <h4 className="text-cente pt-5">Loading......</h4>}
          {error && <h4 className="text-cente pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
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

export default Tours;
