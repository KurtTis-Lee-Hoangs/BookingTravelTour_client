import React, { useState } from "react";
import { Table, Button, Input } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const HotelTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: hotel,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels`, refreshKey);

  const truncateText = (text) => {
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const sortHotels = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (hotel) {
      hotel.sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        // Chuẩn hóa dữ liệu trước khi so sánh
        if (key === "phoneNumber") {
          valueA = valueA.replace(/\s|-/g, ""); // Loại bỏ khoảng trắng và dấu gạch
          valueB = valueB.replace(/\s|-/g, "");
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        // So sánh giá trị
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
  const filteredHotels = hotel?.filter((hotel) => {
    const searchTerm = searchQuery.toLowerCase();
    const phoneNumberFormatted = hotel.phoneNumber.replace(/\s|-/g, ""); // Loại bỏ khoảng trắng và dấu gạch ngang
    return (
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.address.toLowerCase().includes(searchTerm) ||
      phoneNumberFormatted.includes(searchTerm)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3  mb-3">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by Name, Address or Phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", boxShadow: "none" }}
        />
        <Button color="primary" size="m">
          Add tour
        </Button>
      </div>
      <Table striped style={{ minWidth: "500px" }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th onClick={() => sortHotels("name")}>
              Name {renderSortIcon("name")}
            </th>
            <th onClick={() => sortHotels("address")}>
              Address {renderSortIcon("address")}
            </th>
            <th onClick={() => sortHotels("phoneNumber")}>
              Phone {renderSortIcon("phoneNumber")}
            </th>
            <th onClick={() => sortHotels("description")}>
              Description {renderSortIcon("description")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels?.map((hotel) => (
            <tr key={hotel._id}>
              <td>
                <img
                  src={hotel.photo}
                  alt="Tour imgae"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{truncateText(hotel.name)}</td>
              <td>{truncateText(hotel.address)}</td>
              <td>{hotel.phoneNumber}</td>
              <td>{truncateText(hotel.description)}</td>
              <td>
                <Button className="acction__btn" color="primary" size="sm">
                  {" "}
                  Edit{" "}
                </Button>
                <Button color="danger" size="sm">
                  {" "}
                  Delete{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HotelTable;
