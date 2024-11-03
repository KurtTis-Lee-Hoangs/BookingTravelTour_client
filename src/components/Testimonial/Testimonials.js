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
  
  //   return (
  //     <Slider {...settings}>
  //       <div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div><div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="testimonial py-4 px-3">
  //         <p>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </p>

  //         <div className="d-flex align-items-center gap-4 mt-3">
  //           <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
  //           <div>
  //             <h5 className="mb-0 mt-3">John Doe</h5>
  //             <p>Customer</p>
  //           </div>
  //         </div>
  //       </div>
  //     </Slider>
  //   );
  


  const slides = [
    { img: ava01, name: "John Doe", role: "Customer" },
    { img: ava02, name: "Jane Doe", role: "Customer" },
    { img: ava03, name: "Mike Smith", role: "Customer" },
  ];
  const doubleSlides = [...slides, ...slides]; // Nhân đôi danh sách slide

  return (
    <Slider {...settings}>
      {doubleSlides.map((slide, index) => (
        <div key={index} className="testimonial py-4 px-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
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
