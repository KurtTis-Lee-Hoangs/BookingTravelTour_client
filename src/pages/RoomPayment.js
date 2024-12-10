import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import "../styles/room-payment.css";

const RoomPayment = () => {
  const { id } = useParams(); // Lấy ID phòng từ URL
  const {
    data: room,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/room/${id}`); // Lấy thông tin phòng
  const [paymentMethod, setPaymentMethod] = useState(""); // State để lưu phương thức thanh toán

  if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  // Xử lý khi người dùng submit form
  const handlePayment = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    // Gửi yêu cầu thanh toán ở đây (API gọi đến backend)
    alert(`Payment method selected: ${paymentMethod}`);
  };

  return (
    <div className="room-payment">
      <div className="room-payment__form">
        <h3>Payment Information</h3>
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          {/* Payment Method Selection */}
          <div className="form-group">
            <label>Payment Method</label>
            <div className="payment-methods">
              <div
                className={`payment-option ${
                  paymentMethod === "ZaloPay" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("ZaloPay")}
              >
                <img src="/images/zalopay.png" alt="ZaloPay" />
                <span>ZaloPay</span>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "VNPay" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("VNPay")}
              >
                <img src="/images/vnpay.png" alt="VNPay" />
                <span>VNPay</span>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "Momo" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("Momo")}
              >
                <img src="/images/momo.png" alt="Momo" />
                <span>Momo</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Confirm Payment
          </button>
        </form>
      </div>

      <div className="room-payment__details">
        <h3>Room Details</h3>
        <div className="room-detail">
          <img
            src={
              (room.images && room.images.length > 0 && room.images[0]) ||
              "/default-room.jpg"
            }
            alt={room.roomType}
          />
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
            <strong>Price:</strong> {room.price} VND
          </p>
          <p>
            <strong>Status:</strong> {room.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomPayment;
