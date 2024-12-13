import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import { Table, Container, Row, Col, Input } from "reactstrap";
import "./booking-history.css";
import NewSletter from "../../shared/NewSletter";

const HotelBookingHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null); // Initially no sorting

  const {
    data: hotelBookingData,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/user/getUserBookings`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hotelBookingData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  const sortData = (data, key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      // Access the values for each key (nested keys like 'hotelRoomId.roomType')
      const aValue = key.split(".").reduce((o, i) => (o ? o[i] : undefined), a);
      const bValue = key.split(".").reduce((o, i) => (o ? o[i] : undefined), b);

      // Handle sorting for Room Type (String)
      if (key === "hotelRoomId.roomType") {
        if (aValue && bValue) {
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0; // Return 0 if any value is undefined
      }

      // Handle sorting for Dates (Check-in and Check-out)
      if (key === "checkInDate" || key === "checkOutDate") {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Handle sorting for Price (Total Price)
      if (key === "totalPrice") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle sorting for Payment Status (Boolean)
      if (key === "isPayment") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Default case: Return 0 for other undefined or unhandled keys
      return 0;
    });

    return sortedData;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction }); // Set the new sorting config
  };

  const renderSortIcon = (key) => {
    const isActive = sortConfig?.key === key;
    return (
      <i
        className={`ri-arrow-up-down-line ${isActive ? "text-primary" : ""}`}
        style={{ marginLeft: "5px", fontSize: "1rem" }}
      ></i>
    );
  };

  const filteredBookings = hotelBookingData?.filter((booking) => {
    // Check if Room Type matches the search query
    const roomTypeMatch = booking.hotelRoomId.roomType
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if Check-in Date matches the search query
    const checkInDateMatch = new Date(booking.checkInDate)
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .includes(searchQuery); // Matches against "DD/MM/YYYY" format

    // Check if Check-out Date matches the search query
    const checkOutDateMatch = new Date(booking.checkOutDate)
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .includes(searchQuery); // Matches against "DD/MM/YYYY" format

    // Check if Total Price matches the search query
    const totalPriceMatch = formatCurrency(booking.totalPrice)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if Payment Status matches the search query
    const paymentStatusMatch = (booking.isPayment ? "Paid" : "Unpaid")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      roomTypeMatch ||
      checkInDateMatch ||
      checkOutDateMatch ||
      totalPriceMatch ||
      paymentStatusMatch
    );
  });

  const sortedBookings = sortConfig
    ? sortData(filteredBookings, sortConfig.key, sortConfig.direction)
    : filteredBookings; // No sorting by default

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <div className="booking-history-table">
                <h2 className="table-title">Hotel Booking</h2>
                <div className="d-flex gap-3 mb-3">
                  <Input
                    type="text"
                    placeholder="Search by Room Type, Check-in Date, Check-out Date, or Payment Status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "600px", boxShadow: "none" }}
                  />
                </div>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("hotelRoomId.roomType")}>
                        Room Type {renderSortIcon("hotelRoomId.roomType")}
                      </th>
                      <th onClick={() => handleSort("checkInDate")}>
                        Check-in Date {renderSortIcon("checkInDate")}
                      </th>
                      <th onClick={() => handleSort("checkOutDate")}>
                        Check-out Date {renderSortIcon("checkOutDate")}
                      </th>
                      <th onClick={() => handleSort("totalPrice")}>
                        Total Price {renderSortIcon("totalPrice")}
                      </th>
                      <th onClick={() => handleSort("isPayment")}>
                        Payment Status {renderSortIcon("isPayment")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBookings?.length > 0 ? (
                      sortedBookings.map((hotelBookingData) => {
                        const formattedCheckInDate = new Date(
                          hotelBookingData.checkInDate
                        ).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });
                        const formattedCheckOutDate = new Date(
                          hotelBookingData.checkOutDate
                        ).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });
                        const formattedPrice = formatCurrency(
                          hotelBookingData.totalPrice
                        );
                        const paymentStatus = hotelBookingData.isPayment
                          ? "Paid"
                          : "Unpaid";

                        return (
                          <tr key={hotelBookingData._id}>
                            <td>{hotelBookingData.hotelRoomId.roomType}</td>
                            <td>{formattedCheckInDate}</td>
                            <td>{formattedCheckOutDate}</td>
                            <td>{formattedPrice}</td>
                            <td
                              style={{
                                color: hotelBookingData.isPayment
                                  ? "green"
                                  : "red",
                              }}
                            >
                              {paymentStatus}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <NewSletter />
    </>
  );
};

export default HotelBookingHistory;
