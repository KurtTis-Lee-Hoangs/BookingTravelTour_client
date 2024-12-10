import React, { useState, useEffect } from "react";
import CommonSection from "../..//shared/CommonSection.js";
// import "./hotel-card.css";
import HotelCard from "./HotelCard.js";
import NewSletter from "../../shared/NewSletter";
import { Container, Row, Col } from "reactstrap";
import ScrollButton from "../../shared/ScrollButton";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
const Hotel = () => {
  // State for pagination
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  // Fetch hotels based on the current page
  const { data: hotels, loading, error } = useFetch(`${BASE_URL}/hotels?page=${page}`);
  // Fetch hotel count to calculate pagination
  const { data: hotelCount } = useFetch(`${BASE_URL}/hotels/search/getHotelCount`);
  // Update the page count when hotelCount or page changes
  useEffect(() => {
    if (hotelCount) {
      const pages = Math.ceil(hotelCount / 8); // Assume 8 hotels per page
      setPageCount(pages);
    }
    window.scrollTo(0, 0); // Scroll to top when page changes
  }, [page, hotelCount]);
  return (
    <>
      <CommonSection title={"All Hotels"} />
      <div className="mt-5">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          
          {!loading && !error && (
            <Row>
              {hotels?.map((hotel) => (
                <Col lg="3" md="6" sm="6" key={hotel._id} className="mb-4">
                  <HotelCard hotel={hotel} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {/* Generate page numbers for pagination */}
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}  // Set the page when clicked
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
export default Hotel;