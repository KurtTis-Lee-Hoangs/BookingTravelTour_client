import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddHotelModal from "./AddHotelModal";
import EditHotelModal from "./EditHotelModal";
import SearchIcon from "@mui/icons-material/Search";
import HotelRooms from "../HotelRooms/HotelRooms";
import VisibilityIcon from "@mui/icons-material/Visibility";

const HotelTable = ({ hotels }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: hotel,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/getAllHotelByAdmin`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    photo: null,
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [originalHotel, setOriginalHotel] = useState(null);

  // Track selected hotel for viewing rooms
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const handleFinishViewing = () => {
    setSelectedHotelId(null); // Hide the room list by resetting hotelId
  };

  const openEditModal = (hotel) => {
    setOriginalHotel(hotel); // Lưu bản sao dữ liệu gốc
    setEditingHotel(hotel); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddHotel = async () => {
    const formData = new FormData();
    for (const key in newHotel) {
      formData.append(key, newHotel[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/hotels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
        credentials: "include",
      });

      if (!responseAdd.ok) {
        // throw new Error("Failed to add tour");
        const errorData = await responseAdd.json();
        throw new Error(errorData.message || "Failed to add tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewHotel({
        name: "",
        address: "",
        phoneNumber: "",
        photo: null,
        description: "",
      });
      toggleModal();
    } catch (error) {
      alert(error.message);
    }
  };
  const handlePhotoChange = async (e, setHotelState) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatarImg");

      try {
        // Gửi ảnh lên Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmbkgg1ac/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          setHotelState((prev) => ({
            ...prev,
            photo: data.secure_url, // Add the new photo URL to the state
          }));
        }
      } catch (error) {
        console.error("Error uploading photo to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleEditHotel = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingHotel).forEach((key) => {
        if (editingHotel[key] !== originalHotel[key]) {
          updatedFields[key] = editingHotel[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/hotels/${editingHotel._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
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
        body: JSON.stringify({ isActive: false }),
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
    <div>
      <div className="d-flex gap-3 mb-3">
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          Add Hotel
        </Button>
      </div>

      {/* Render the HotelRooms table if a hotel is selected */}
      {selectedHotelId && (
        <HotelRooms hotelId={selectedHotelId} onFinishViewing={handleFinishViewing} />
      )}

      <TableContainer component={Paper}>
        <Table>
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
                Name
                {renderSortIcon("name")}
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
                Address
                {renderSortIcon("address")}
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
                Phone
                {renderSortIcon("phoneNumber")}
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
                Description
                {renderSortIcon("description")}
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
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => setSelectedHotelId(hotel._id)}
                    style={{ marginRight: "10px" }}
                    startIcon={<VisibilityIcon />}
                  >
                    View Rooms
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ marginRight: "10px" }}
                    onClick={() => openEditModal(hotel)}
                  >
                    Edit Hotel
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteHotel(hotel._id)}
                  >
                    Delete Hotel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Components */}
      <AddHotelModal
        isOpen={modal}
        toggle={toggleModal}
        newHotel={newHotel}
        handleChange={handleChange}
        handleAddHotel={handleAddHotel}
        handlePhotoChange={handlePhotoChange}
        setNewHotel={setNewHotel}
      />

      <EditHotelModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingHotel={editingHotel}
        setEditingHotel={setEditingHotel}
        handleEditHotel={handleEditHotel}
        handlePhotoChange={handlePhotoChange}
      />
    </div>
  );
};

export default HotelTable;
