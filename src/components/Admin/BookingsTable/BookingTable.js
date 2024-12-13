import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import EditBookingModal from "./EditBookingModal";
import SearchIcon from "@mui/icons-material/Search";

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
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isDelete: true }),
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
    return Number(price).toLocaleString("vi-VN") + " VND";
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

          // If you want to ensure proper sorting by date (year, month, day)
          return direction === "asc"
            ? valueA - valueB // Ascending order
            : valueB - valueA; // Descending order
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
      new Date(booking.bookAt)
        .toLocaleDateString("vi-VN", {
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
    <div>
      <div className="d-flex gap-3 mb-3">
        <TextField
          label="Search by Email, Name, TourName, Phone (+84 xxxxxxxxx) or BookAt"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton position="end">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 1500 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                UserID
              </TableCell>
              <TableCell
                onClick={() => sortBookings("userEmail")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                User email {renderSortIcon("userEmail")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("tourName")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Tour name {renderSortIcon("tourName")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("fullName")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                FullName {renderSortIcon("fullName")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("guestSize")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Guest size {renderSortIcon("guestSize")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("phone")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Phone {renderSortIcon("phone")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("bookAt")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                BookAt {renderSortIcon("bookAt")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("totalPrice")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Total Price {renderSortIcon("totalPrice")}
              </TableCell>
              <TableCell
                onClick={() => sortBookings("isPayment")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Payment {renderSortIcon("isPayment")}
              </TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings?.map((booking) => {
              const formattedBookAt = new Date(
                booking.bookAt
              ).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              const formattedPhone = formatPhoneNumber(booking.phone);
              return (
                <TableRow key={booking._id}>
                  <TableCell>{truncateText(booking.userId)}</TableCell>
                  <TableCell>{truncateText(booking.userEmail)}</TableCell>
                  <TableCell>{truncateText(booking.tourName)}</TableCell>
                  <TableCell>{truncateText(booking.fullName)}</TableCell>
                  <TableCell>{truncateText(booking.guestSize)}</TableCell>
                  <TableCell>{formattedPhone}</TableCell>
                  <TableCell>{formattedBookAt}</TableCell>
                  <TableCell>{formatCurrency(booking.totalPrice)}</TableCell>
                  <TableCell>
                    {/* {booking.isPayment ? "Paid" : "Unpaid"} */}
                    {booking.isPayment ? (
                      <span style={{ color: "green" }}>Yes</span>
                    ) : (
                      <span style={{ color: "red" }}>No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openEditModal(booking)}
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBooking(booking._id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {editModal && (
        <EditBookingModal
          isOpen={editModal}
          toggle={() => setEditModal(false)}
          editingBooking={editingBooking}
          setEditingBooking={setEditingBooking}
          handleEditBooking={handleEditBooking}
        />
      )}
    </div>
  );
};

export default BookingsTable;
