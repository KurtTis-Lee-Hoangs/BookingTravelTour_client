import React, { useState } from "react";
import { Button, Input, Progress } from "reactstrap";
import "./weather.css"; // CSS cho giao diện đẹp hơn
import { BASE_URL } from "../../utils/config";

const Vehicle = () => {
  const [city, setCity] = useState(""); // Thành phố
  const [district, setDistrict] = useState(""); // Quận (nếu có)
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="weather-page container py-5 mb-5">
      <h2 className="text-center mb-4">Weather Forecast</h2>
      <div className="weather-form mb-4">
        <Input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        {/* <Input
          type="text"
          placeholder="Enter district (optional)"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="weather-input mt-2"
        /> */}
        <Button color="btn primary__btn btn__weather" className="mt-3" onClick={fetchWeather}>
          See the weather
        </Button>
      </div>
      {loading && (
        <Progress animated color="info" value={100} className="mt-3" />
      )}
      {error && <p className="text-danger mt-3">{error}</p>}
      {weatherData && (
        <div className="weather-result mt-4">
          <h5>
            Weather in {weatherData.city}, {weatherData.country}
          </h5>
          <div className="weather-row">
            {weatherData.weeklyWeather.map((item, index) => (
              <div key={index} className="weather-card">
                <span className="weather-icon">
                  {getWeatherIcon(item.weather)}
                </span>
                <p>{item.date}</p>
                <h6>{item.temperature}°C</h6>
                <p>{item.weather}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicle;
