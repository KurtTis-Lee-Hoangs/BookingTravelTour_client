import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import { Table, Container, Row, Col } from "reactstrap";
import "./booking-history.css";

const BookingHistory = () => {
  const {
    data: bookingData,
    loading,
    error,
  } = useFetch(`${BASE_URL}/booking/user/history`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Hàm định dạng số điện thoại
  const formatPhoneNumber = (phone) => {
    const phoneStr = phone.toString();
    return "+84 " + phoneStr.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="booking-history-table">
            <h2 className="table-title">Booking History</h2>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Name</th>
                  <th>Tour Name</th>
                  <th>Size</th>
                  <th>Phone</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookingData?.map((bookingData) => {
                  const formattedDate = new Date(
                    bookingData.bookAt
                  ).toLocaleDateString();
                  const formattedPhone = formatPhoneNumber(bookingData.phone);

                  return (
                    <tr key={bookingData._id}>
                      <td>{bookingData.userEmail}</td>
                      <td>{bookingData.fullName}</td>
                      <td>{bookingData.tourName}</td>
                      <td>{bookingData.guestSize}</td>
                      <td>{formattedPhone}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingHistory;
