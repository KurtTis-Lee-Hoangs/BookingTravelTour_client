import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "../Tour/TourCard";
import NewSletter from "../../shared/NewSletter";
import ScrollButton from "../../shared/ScrollButton";


const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"Tours Search Result"} />
      <section>
        <Container>
          <Row>
            <h2 className="mb-5">Tours By Search</h2>
            {data.length === 0 ? (
              <h2 className="text-center">No tours found</h2>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
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

export default SearchResultList;
