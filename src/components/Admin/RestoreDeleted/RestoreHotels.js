import React, { useState } from "react";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HotelTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: hotel,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/getAllHotelByAdminDelete`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newTour, setNewTour] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    description: "",
    photo: null,
    desc: "",
  });

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

  const handleDeleteHotel = async (hotelId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/hotels/${hotelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isActive: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete hotel");
      }

      // Làm mới danh sách user sau khi xóa
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowY: "auto", maxHeight: "550px" }}>
      <div className="d-flex gap-3  mb-3">
        {/* Search Bar */}
        <TextField
          label="Search by Name, Address or Phone"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="hotel table">
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
                Avatar
              </TableCell>
              <TableCell
                onClick={() => sortHotels("name")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Name {renderSortIcon("name")}
              </TableCell>
              <TableCell
                onClick={() => sortHotels("address")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Address {renderSortIcon("address")}
              </TableCell>
              <TableCell
                onClick={() => sortHotels("phoneNumber")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Phone {renderSortIcon("phoneNumber")}
              </TableCell>
              <TableCell
                onClick={() => sortHotels("description")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Description {renderSortIcon("description")}
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
            {filteredHotels?.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell>
                  <img
                    src={hotel.photo}
                    alt="Hotel"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell>{truncateText(hotel.name)}</TableCell>
                <TableCell>{truncateText(hotel.address)}</TableCell>
                <TableCell>{hotel.phoneNumber}</TableCell>
                <TableCell>{truncateText(hotel.description)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteHotel(hotel._id)}
                  >
                    Restore Hotel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HotelTable;
