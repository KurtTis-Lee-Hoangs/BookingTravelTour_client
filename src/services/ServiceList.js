import React, { useState } from "react";
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Progress } from "reactstrap";
import "./service-card.css"; // CSS cho giao diện đẹp hơn

import { BASE_URL } from "../utils/config";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Weather",
    desc: "Get the weather forecast for your location",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Get a tour guide for your location",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Customize your tour package",
  },
];

const ServiceList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState(""); // Thành phố
  const [district, setDistrict] = useState(""); // Quận (nếu có)
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setCity("");
    setDistrict("");
    setWeatherData(null);
    setError(null);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Cập nhật endpoint để gửi city và district (nếu có)
      const url = district
        ? `${BASE_URL}/services/weather?city=${city}&district=${district}`
        : `${BASE_URL}/services/weather?city=${city}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to fetch weather data.");
        return;
      }

      setWeatherData(data);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weather) => {
    if (weather.includes("rain")) return "🌧️"; // Mưa
    if (weather.includes("cloud")) return "☁️"; // Mây
    if (weather.includes("clear")) return "☀️"; // Nắng
    if (weather.includes("snow")) return "❄️"; // Tuyết
    return "🌈"; // Khác
  };

  return (
    <>
      <div className="service-list">
        {servicesData.map((item, index) => (
          <Col lg="4" key={index} className="service-card">
            <Button className="service-btn" onClick={toggleModal}>
              <img src={item.imgUrl} alt={item.title} className="service-img" />
              <div className="service-info">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Button>
          </Col>
        ))}
      </div>

      {/* Weather Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} className="weather-modal">
        <ModalHeader toggle={toggleModal}>Weather Forecast</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="weather-input"
          />
          <Input
            type="text"
            placeholder="Enter district (optional)"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="weather-input mt-2"
          />
          {loading && <Progress animated color="info" value={100} className="mt-3" />}
          {error && <p className="text-danger mt-3">{error}</p>}
          {weatherData && (
            <div className="weather-result mt-4">
              <h5>
                Weather in {weatherData.city}, {weatherData.country}
              </h5>
              <div className="weather-row">
                {weatherData.weeklyWeather.map((item, index) => (
                  <div key={index} className="weather-card">
                    <span className="weather-icon">{getWeatherIcon(item.weather)}</span>
                    <p>{item.date}</p>
                    <h6>{item.temperature}°C</h6>
                    <p>{item.weather}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={fetchWeather}>
            Fetch Weather
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ServiceList;
