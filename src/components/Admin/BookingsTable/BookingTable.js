import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import EditBookingModal from "./EditBookingModal";

const BookingsTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: booking,
    loading,
    error,
  } = useFetch(`${BASE_URL}/bookings`, refreshKey);

  const [editModal, setEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [originalBooking, setOriginalBooking] = useState(null);
  const openEditModal = (booking) => {
    setOriginalBooking(booking); // Lưu bản sao dữ liệu gốc
    setEditingBooking(booking); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const handleEditBooking = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingBooking).forEach((key) => {
        if (editingBooking[key] !== originalBooking[key]) {
          updatedFields[key] = editingBooking[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/bookings/${editingBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Format phone number with +84 prefix
  const formatPhoneNumber = (phone) => {
    const phoneStr = phone.toString();
    return "+84 " + phoneStr.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        <h2>Bookings List</h2>
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
            <th>Total Price</th>
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
                  {booking.isPayment ? (
                    <span style={{ color: "green" }}>Yes</span>
                  ) : (
                    <span style={{ color: "red" }}>No</span>
                  )}
                </td>
                <td>
                  <Button
                    className="acction__btn"
                    color="primary"
                    size="sm"
                    onClick={() => openEditModal(booking)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* Modal edit tour */}
      <EditBookingModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingBooking={editingBooking}
        setEditingBooking={setEditingBooking}
        handleEditBooking={handleEditBooking}
      />
    </div>
  );
};

export default BookingsTable;
