import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { BASE_URL } from "../../../utils/config";

const AddRoomModal = ({ open, onClose, hotelId, onRoomAdded }) => {
  const [newRoom, setNewRoom] = useState({
    hotelId: hotelId,
    roomNumber: "",
    square: "",
    roomType: "",
    maxOccupancy: "",
    price: "",
    images: "",
    status: "Available",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatarImg");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmbkgg1ac/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          setNewRoom((prev) => ({
            ...prev,
            images: data.secure_url,
          }));
        }
      } catch (error) {
        console.error("Error uploading photo to Cloudinary:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmitAddRoom = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/hotels/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newRoom),
      });
      const data = await response.json();

      if (data.success) {
        onRoomAdded(data.data); // Call parent callback to add the new room to the list
        setNewRoom({
          hotelId: hotelId,
          roomNumber: "",
          square: "",
          roomType: "",
          maxOccupancy: "",
          price: "",
          images: "",
          status: "Available",
        });
        onClose(); // Close the modal
      } else {
        console.error("Error adding room");
      }
    } catch (error) {
      console.error("Error adding room", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <h3>Add New Room</h3>
        <form onSubmit={handleSubmitAddRoom}>
          <TextField
            label="Room Number"
            name="roomNumber"
            value={newRoom.roomNumber}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Square"
            name="square"
            value={newRoom.square}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Room Type"
            name="roomType"
            value={newRoom.roomType}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Max Occupancy"
            name="maxOccupancy"
            value={newRoom.maxOccupancy}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            name="price"
            value={newRoom.price}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Upload Images
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </Button>
          {isUploading && <p>Uploading image...</p>}
          <Button type="submit" variant="contained" color="primary">
            Add Room
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRoomModal;
