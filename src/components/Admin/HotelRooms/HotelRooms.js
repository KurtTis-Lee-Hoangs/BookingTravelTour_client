import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import AddRoomModal from "./AddRoomModal"; // Import the modal

const HotelRooms = ({ hotelId, onFinishViewing }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddRoomModal, setOpenAddRoomModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    if (!hotelId) return;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/hotels/rooms/${hotelId}`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setRooms(data.data);
        } else {
          setError("No rooms available");
        }
      } catch (error) {
        setError("Error fetching rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleOpenAddRoomModal = () => {
    setOpenAddRoomModal(true);
  };

  const handleCloseAddRoomModal = () => {
    setOpenAddRoomModal(false);
  };

  const handleRoomAdded = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]); // Add the new room to the list
  };

  const sortRooms = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    setRooms((prevRooms) => {
      return [...prevRooms].sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        // Normalize data for comparison
        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    });
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

  if (!hotelId) {
    return <div>Select a hotel to view rooms.</div>;
  }

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onFinishViewing}
          sx={{
            display: "block",
            marginBottom: 1,
          }}
        >
          Finish Viewing
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenAddRoomModal}
          sx={{
            display: "block",
            marginBottom: 1,
          }}
        >
          Add Room
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { label: "Room Number", key: "roomNumber" },
                { label: "Room Type", key: "roomType" },
                { label: "Max Occupancy", key: "maxOccupancy" },
                { label: "Price", key: "price" },
                { label: "Status", key: "status" },
              ].map((column) => (
                <TableCell
                  key={column.key}
                  onClick={() => sortRooms(column.key)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    paddingRight: 1,
                    whiteSpace: "nowrap",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {column.label}
                  {renderSortIcon(column.key)}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No rooms found
                </TableCell>
              </TableRow>
            ) : (
              rooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.maxOccupancy}</TableCell>
                  <TableCell>{room.price}</TableCell>
                  <TableCell>{room.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                    {room.status === "Unavailable" && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ marginLeft: 1 }}
                      >
                        Checkout
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddRoomModal
        open={openAddRoomModal}
        onClose={handleCloseAddRoomModal}
        hotelId={hotelId}
        onRoomAdded={handleRoomAdded}
      />
    </div>
  );
};

export default HotelRooms;
