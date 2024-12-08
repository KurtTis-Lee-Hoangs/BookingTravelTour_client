import React, { useState } from "react";
import { Table, Button, Input } from "reactstrap";
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

      const response = await fetch(
        `${BASE_URL}/bookings/${editingBooking._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
          credentials: "include",
        }
      );

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

  const truncateText = (text) => {
    return text.length > 15 ? text.slice(0, 15) + "..." : text;
  };

  const formatCurrency = (price) => {
    return (
      Number(price).toLocaleString(
        "vi-VN"
      ) + " VND"
    );
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortBookings = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (booking) {
      booking.sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        // Handle date sorting
        if (key === "bookAt") {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }

        // Handle numeric sorting
        if (key === "guestSize" || key === "totalPrice" || key === "phone") {
          valueA = parseFloat(valueA) || 0; // Default to 0 if not a number
          valueB = parseFloat(valueB) || 0;
        } else {
          // Convert to string and lowercase for other fields
          valueA = valueA?.toString().toLowerCase() || "";
          valueB = valueB?.toString().toLowerCase() || "";
        }

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
  };

  const renderSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <i
        className={`ri-arrow-up-down-line ${isActive ? "text-primary" : ""}`}
        style={{ marginLeft: "5px", fontSize: "1rem" }}
      ></i>
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  // Filter users based on search query
  const filteredBookings = booking?.filter((booking) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      booking.userEmail.toLowerCase().includes(searchTerm) ||
      booking.tourName.toLowerCase().includes(searchTerm) ||
      booking.fullName.toLowerCase().includes(searchTerm) ||
      // booking.guestSize.toString().toLowerCase().includes(searchTerm) ||
      booking.phone.toString().toLowerCase().includes(searchTerm) ||
      new Date(booking.bookAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .toLowerCase()
        .includes(searchTerm)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        <Input
          type="text"
          placeholder="Search by Email, Name, TourName, Phone (+84 xxxxxxxxx) or BookAt"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", boxShadow: "none" }}
        />
      </div>
      <Table striped style={{ minWidth: "1400px" }}>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>UserID</th>
            <th onClick={() => sortBookings("userEmail")}>
              User email {renderSortIcon("userEmail")}
            </th>
            <th onClick={() => sortBookings("tourName")}>
              Tour name {renderSortIcon("tourName")}
            </th>
            <th onClick={() => sortBookings("fullName")}>
              FullName {renderSortIcon("fullName")}
            </th>
            <th onClick={() => sortBookings("guestSize")}>
              Guest size {renderSortIcon("guestSize")}
            </th>
            <th onClick={() => sortBookings("phone")}>
              Phone {renderSortIcon("phone")}
            </th>
            <th onClick={() => sortBookings("bookAt")}>
              bookAt {renderSortIcon("bookAt")}
            </th>
            <th onClick={() => sortBookings("totalPrice")}>
              Total Price {renderSortIcon("totalPrice")}
            </th>
            <th onClick={() => sortBookings("isPayment")}>
              Payment {renderSortIcon("isPayment")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings?.map((booking) => {
            const formattedBookAt = new Date(booking.bookAt).toLocaleDateString(
              "vi-VN",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            );
            const formattedPhone = formatPhoneNumber(booking.phone);
            return (
              <tr key={booking._id}>
                <td>{truncateText(booking.userId)}</td>
                <td>{truncateText(booking.userEmail)}</td>
                <td>{truncateText(booking.tourName)}</td>
                <td>{truncateText(booking.fullName)}</td>
                <td>{truncateText(booking.guestSize)}</td>
                <td>{formattedPhone}</td>
                <td>{formattedBookAt}</td>
                <td>{formatCurrency(booking.totalPrice)}</td>
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
