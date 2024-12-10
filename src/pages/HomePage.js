import React from "react";
import "../styles/homepage.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../components/SearchTour/SearchBar";
import ServiceList from "../services/ServiceList";
import ForeignTours from "../components/Foreign-tours/Foreign.Tours";
import DomesticTours from "../components/Domestic-tours/Domestic.Tours";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import NewSletter from "../shared/NewSletter";
import ScrollButton from "../shared/ScrollButton";

const HomePage = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>

                <h1>
                  Travel opens the door to creating
                  <span className="highlight"> memories</span>
                </h1>
                <p>
                  Travel is not just about exploring new destinations. It’s
                  about opening up opportunities to create unforgettable
                  memories. Each journey offers unique experiences, from moments
                  of awe in breathtaking landscapes to meaningful encounters
                  with new people and cultures. These memories are not merely
                  photographs or stories to tell but are profound emotions, life
                  lessons, and lasting values that stay with us forever.
                  Therefore, travel is not only a journey across physical spaces
                  but also a path of self-discovery and growth.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls autoPlay loop muted />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </div>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* Our foreign tours */}
      <div>
        <Container>
          <Row>
            <Col lg="12" className="mb-4">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our foreign tours</h2>
            </Col>
            <ForeignTours />
          </Row>
        </Container>
      </div>

      {/* Our domestic tours */}
      <div>
        <Container>
          <Row>
            <Col lg="12" className="mb-3">
              <Subtitle subtitle={"Explore"} />
              {/* <h2 className="featured__tour-title">Our featured tours</h2> */}
              <h2 className="featured__tour-title">Our domestic tours</h2>
            </Col>
            <DomesticTours />
          </Row>
        </Container>
      </div>

      <div className="mt-4">
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />

                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  With all our experience in the industry, we are committed to
                  providing you with the highest quality service.
                  <br />
                  Over the years, we have honed our skills, learned from every
                  challenge, and continuously improved to meet your needs.
                  Whether it's through personalized attention, expert solutions,
                  or reliable support, we are here to serve you with the full
                  extent of our knowledge and expertise. Trust that, with our
                  experience, your satisfaction is our top priority.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful tour</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>

                <div className="counter__box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="lala" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Images */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customer tour gallery
              </h2>
            </Col>

            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <div>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </div>
      <ScrollButton />

      <NewSletter />
    </>
  );
};

export default HomePage;