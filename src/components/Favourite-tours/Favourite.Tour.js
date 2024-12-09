import React, { useEffect, useContext } from "react";
import CommonSection from "../../shared/CommonSection";
import "./favourite-tour.css";
import TourCard from "../Tour/TourCard";
import NewSletter from "../../shared/NewSletter";
import { Container, Row, Col } from "reactstrap";
import ScrollButton from "../../shared/ScrollButton";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const FavouriteTour = () => {
  const { user } = useContext(AuthContext);
  const { data: tours, loading, error } = useFetch(
    `${BASE_URL}/users/${user._id}/favorites`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"Favourite Tours"} />

      <section className="">
        <Container>
          {!loading && !error && tours?.length > 0 && (
            <Row>
              {tours.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          )}
          {!loading && !error && tours?.length === 0 && (
            <h4 className="text-center pt-5">No favorite tours found.</h4>
          )}
        </Container>
      </section>
      <NewSletter />
      <ScrollButton />
    </>
  );
};

export default FavouriteTour;
