import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import "../styles/room-payment.css";
import { AuthContext } from "../context/AuthContext";
import momoLogo from "../assets/images/momo.png";
import zalopayLogo from "../assets/images/zalopay.png";
import vnpayLogo from "../assets/images/vnpay.png";
import { Col, Container, Row } from "reactstrap";

const RoomPayment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: room,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/room/${id}`);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(room.price || 0);
  const [numNights, setNumNights] = useState(1);
  const [fullName, setFullName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (!checkInDate || !checkOutDate) {
      setTotalPrice(room.price || 0);
    } else if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nightDiff = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
      const calculatedNights = nightDiff > 0 ? nightDiff : 1;
      setNumNights(calculatedNights);
      setTotalPrice(calculatedNights * (room.price || 0));
    }
  }, [checkInDate, checkOutDate, room.price]);

  if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra định dạng số điện thoại
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/; // Regex dành cho số điện thoại Việt Nam
    return phoneRegex.test(phone);
  };

  const handleCheckInDateChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);

    if (checkOutDate) {
      const checkIn = new Date(selectedDate);
      const checkOut = new Date(checkOutDate);
      const nightDiff = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
      // setNumNights(nightDiff > 0 ? nightDiff : 1);
      // setTotalPrice(room.price * numNights + numNights * 200000);
      const calculatedNights = nightDiff > 0 ? nightDiff : 1;
      setNumNights(calculatedNights);
      setTotalPrice(calculatedNights * room.price); // Cập nhật giá tiền
    }
  };

  const handleCheckOutDateChange = (e) => {
    const selectedDate = e.target.value;
    setCheckOutDate(selectedDate);

    // const checkIn = new Date(checkInDate);
    // const checkOut = new Date(selectedDate);
    // const nightDiff = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    // setNumNights(nightDiff > 0 ? nightDiff : 1);
    // setTotalPrice(room.price * numNights + numNights * 200000);
    if (checkInDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(selectedDate);
      const nightDiff = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
      const calculatedNights = nightDiff > 0 ? nightDiff : 1;
      setNumNights(calculatedNights);
      setTotalPrice(calculatedNights * room.price); // Cập nhật giá tiền
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};

    if (!fullName || fullName.split(" ").length < 2) {
      errors.fullName = "Please enter a valid full name (first and last name).";
    }

    if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber =
        "Please enter a valid phone number (e.g., 0912345678).";
    }

    if (!validateEmail(email)) {
      errors.email =
        "Please enter a valid email address (e.g., example@domain.com).";
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    if (!user) {
      alert("Please sign in to book the hotel room.");
      return;
    }

    // If there are any validation errors, show them and don't submit the form
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Proceed with the booking if no validation errors
    try {
      const bookingData = {
        hotelRoomId: id,
        userId: user._id,
        checkInDate,
        checkOutDate,
        totalPrice,
        paymentMethod,
        status: "Pending",
        isPayment: false,
      };

      const res = await fetch(`${BASE_URL}/hotels/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create booking.");
        return;
      }

      const result = await res.json();
      if (result.success && result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        alert("Booking created successfully!");
      }
    } catch (err) {
      console.error("Error during booking:", err.message);
      alert("An error occurred while booking the room. Please try again.");
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="room__payment">
              <div className="room__payment-form">
                <h3>Payment Information</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-payment__group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    {formErrors.fullName && (
                      <span className="error__text">{formErrors.fullName}</span>
                    )}
                  </div>
                  <div className="form-payment__group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    {formErrors.phoneNumber && (
                      <span className="error__text">
                        {formErrors.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div className="form-payment__group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {formErrors.email && (
                      <span className="error__text">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-payment__group">
                    <label htmlFor="checkInDate">Check-in Date</label>
                    <input
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={checkInDate}
                      onChange={handleCheckInDateChange}
                      required
                      min={minDate}
                    />
                  </div>
                  <div className="form-payment__group">
                    <label htmlFor="checkOutDate">Check-out Date</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={checkOutDate}
                      onChange={handleCheckOutDateChange}
                      required
                      min={minDate}
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="form-payment__group">
                    <label>Payment Method</label>
                    <div className="payment__methods">
                      <div
                        className={`payment__option ${
                          paymentMethod === "ZaloPay" ? "selected" : ""
                        }`}
                        onClick={() => setPaymentMethod("ZaloPay")}
                      >
                        <img src={zalopayLogo} alt="ZaloPay" />
                        <span>ZaloPay</span>
                      </div>
                      <div
                        className={`payment__option ${
                          paymentMethod === "VNPay" ? "selected" : ""
                        }`}
                        onClick={() => setPaymentMethod("VNPay")}
                      >
                        <img src={vnpayLogo} alt="VNPay" />
                        <span>VNPay</span>
                      </div>
                      <div
                        className={`payment__option ${
                          paymentMethod === "Momo" ? "selected" : ""
                        }`}
                        onClick={() => setPaymentMethod("Momo")}
                      >
                        <img src={momoLogo} alt="Momo" />
                        <span>Momo</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn primary__btn payment__btn"
                  >
                    Confirm Payment
                  </button>
                </form>
              </div>

              <div className="room__payment-details">
                <h3 className="section__title">Room Details</h3>
                <div className="room__detail">
                  <div className="room__detail-image">
                    <img
                      src={
                        (room.images &&
                          room.images.length > 0 &&
                          room.images[0]) ||
                        "/default-room.jpg"
                      }
                      alt={room.roomType}
                    />
                  </div>
                  <div className="room__detail-info">
                    <p>
                      <strong>Room Type:</strong> {room.roomType}
                    </p>
                    <p>
                      <strong>Square:</strong> {room.square || "Not specified"}
                    </p>
                    <p>
                      <strong>Max Occupancy:</strong> {room.maxOccupancy} people
                    </p>
                    <p>
                      <strong>Price:</strong> {totalPrice} VND
                    </p>
                  </div>
                </div>

                <div className="date__selection">
                  <div className="date__box">
                    <p className="date__title">Check-in</p>
                    <input
                      type="date"
                      value={checkInDate}
                      readOnly
                      className="date__input"
                    />
                    <p className="time__info">From 14:00</p>
                  </div>

                  <div className="night__info">
                    <p>
                      <strong>{numNights} night(s)</strong>
                    </p>
                  </div>

                  <div className="date__box">
                    <p className="date__title">Check-out</p>
                    <input
                      type="date"
                      value={checkOutDate}
                      readOnly
                      className="date__input"
                    />
                    <p className="time__info">Before 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RoomPayment;
