import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const BookingsTable = () => {
  // Fetch the users data from the API
  const { data: booking, loading, error } = useFetch(`${BASE_URL}/booking`);

  // console.log("🚀 ~ UsersTable ~ data:", user)
  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Functions to handle edit and delete actions
  const handleEdit = (id) => {
    // Logic to edit the tour with the given ID
    console.log(`Edit post with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete the tour with the given ID
    console.log(`Delete post with ID: ${id}`);
  };

  // Format phone number with +84 prefix
  const formatPhoneNumber = (phone) => {
    const phoneStr = phone.toString();
    return "+84 " + phoneStr.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        <h2>Bookings List</h2>
        <Button color="primary" size="m">
          Add booking
        </Button>
      </div>
      <Table striped style={{ minWidth: "1400px" }}>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>UserID</th>
            <th>User email</th>
            <th>Tour name</th>
            <th>FullName</th>
            <th>Guest size</th>
            <th>Phone</th>
            <th>bookAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {booking?.map((booking) => {
            const formattedDate = new Date(booking.bookAt).toLocaleDateString();
            const formattedPhone = formatPhoneNumber(booking.phone);
            return (
              <tr key={booking._id}>
                <td>{booking.userId}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{formattedPhone}</td>
                <td>{formattedDate}</td>
                <td>
                  <Button
                    className="acction__btn"
                    color="primary"
                    size="sm"
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingsTable;
