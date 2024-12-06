import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    // speed: 1000,
    speed: 3000,
    swipeToSlide: true,
    // autoplaySpeed: 2000,
    autoplaySpeed: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      img: ava01,
      name: "John Doe",
      role: "Customer",
      text: "The trip we had was absolutely amazing! From start to finish, everything was perfectly organized. The destinations were beautiful, and the activities were well-planned. I can’t wait for the next adventure with you!",
    },
    {
      img: ava02,
      name: "Jane Doe",
      role: "Customer",
      text: "We were blown away by the quality of service and the fantastic experiences you offered. The whole family had a great time, and we are so grateful for the beautiful memories we created together.",
    },
    {
      img: ava03,
      name: "Mike Smith",
      role: "Customer",
      text: "Your service exceeded our expectations. Every detail, from the accommodations to the itinerary, was perfectly tailored to our preferences. It was truly a stress-free and memorable vacation for our family.",
    },
  ];
  const doubleSlides = [...slides, ...slides]; // Nhân đôi danh sách slide

  return (
    <Slider {...settings}>
      {doubleSlides.map((slide, index) => (
        <div key={index} className="testimonial py-4 px-3">
          <p>{slide.text}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img src={slide.img} className="w-25 h-25 rounded-2" alt="" />
            <div>
              <h5 className="mb-0 mt-3">{slide.name}</h5>
              <p>{slide.role}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
