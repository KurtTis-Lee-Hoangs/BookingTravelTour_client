import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import SearchIcon from "@mui/icons-material/Search";

const RestoreTours = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/delete/getAllTourByAdminDeleted`, refreshKey);

  const handleDeleteTour = async (tourId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to restore this tour?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isDelete: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to restore tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error restore tour:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 15 ? text.slice(0, 15) + "..." : text;
  };

  const formatCurrency = (price) => {
    return Number(price).toLocaleString("vi-VN") + " VND";
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortTours = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (tour) {
      tour.sort((a, b) => {
        // Kiểm tra nếu key là các trường số
        if (["day", "price", "maxGroupSize"].includes(key)) {
          const valueA = Number(a[key]) || 0; // Chuyển về số, mặc định là 0 nếu không phải số
          const valueB = Number(b[key]) || 0;
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        // Sắp xếp chuỗi cho các trường khác
        const valueA = a[key]?.toString().toLowerCase() || "";
        const valueB = b[key]?.toString().toLowerCase() || "";
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
  const filteredTours = tour?.filter((tour) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      tour.title.toLowerCase().includes(searchTerm) ||
      tour.city.toLowerCase().includes(searchTerm) ||
      tour.address.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "550px" }}>
      <Box sx={{ display: "flex", gap: 3, marginBottom: 3, marginTop: 2 }}>
        <TextField
          label="Search by Title, City or Address"
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
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="restored tours table">
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
                onClick={() => sortTours("title")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Title {renderSortIcon("title")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("city")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                City {renderSortIcon("city")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("address")}
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
                onClick={() => sortTours("day")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Day {renderSortIcon("day")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("desc")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Description {renderSortIcon("desc")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("price")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Price {renderSortIcon("price")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("maxGroupSize")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Max Group Size {renderSortIcon("maxGroupSize")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("featured")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Featured {renderSortIcon("featured")}
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
            {filteredTours?.map((tour) => (
              <TableRow key={tour._id}>
                <TableCell>
                  <img
                    src={tour.photo}
                    alt="Tour Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell>{truncateText(tour.title)}</TableCell>
                <TableCell>{truncateText(tour.city)}</TableCell>
                <TableCell>{truncateText(tour.address)}</TableCell>
                <TableCell>{truncateText(tour.day)}</TableCell>
                <TableCell>{truncateText(tour.desc)}</TableCell>
                <TableCell>{formatCurrency(tour.price)}</TableCell>
                <TableCell>{truncateText(tour.maxGroupSize)}</TableCell>
                <TableCell>
                  {tour.featured ? (
                    <span style={{ color: "green" }}>Yes</span>
                  ) : (
                    <span style={{ color: "red" }}>No</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteTour(tour._id)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Restore Tour
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RestoreTours;
