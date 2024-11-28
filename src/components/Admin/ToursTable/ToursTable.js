import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";

const ToursTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    city: "",
    address: "",
    day: "",
    photo: null,
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const [editModal, setEditModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [originalTour, setOriginalTour] = useState(null);
  const openEditModal = (tour) => {
    setOriginalTour(tour); // Lưu bản sao dữ liệu gốc
    setEditingTour(tour); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTour((prev) => ({
      ...prev,
      [name]: name === "featured" ? value === "true" : value, // Chuyển đổi sang Boolean nếu là featured
    }));
  };

  const handleAddTour = async () => {
    // Validate fields
    const { day, price, maxGroupSize } = newTour;
    const errors = [];
    if (day < 1) errors.push("Day must be greater than or equal to 1.");
    if (price < 1) errors.push("Price must be greater than or equal to 1.");
    if (maxGroupSize < 1)
      errors.push("Max Group Size must be greater than or equal to 1.");
    if (errors.length > 0) {
      alert(errors.join("\n")); // Hiển thị tất cả các lỗi, mỗi lỗi trên một dòng.
      return;
    }

    const formData = new FormData();
    for (const key in newTour) {
      formData.append(key, newTour[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
        credentials: "include",
      });

      if (!responseAdd.ok) {
        throw new Error("Failed to add tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewTour({
        title: "",
        city: "",
        address: "",
        day: "",
        photo: null,
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  const handlePhotoChange = async (e, setTourState) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Bắt đầu tải ảnh lên
      // Tạo FormData để gửi ảnh lên Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatarImg"); // Đảm bảo cấu hình trên Cloudinary cho phép tải lên không xác thực

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
          setTourState((prev) => ({
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

  const handleDeleteTour = async (tourId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleEditTour = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingTour).forEach((key) => {
        if (editingTour[key] !== originalTour[key]) {
          updatedFields[key] = editingTour[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/tours/${editingTour._id}`, {
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
      console.error("Error updating tour:", error);
    }
  };

  const truncateDesc = (desc) => {
    const words = desc.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : desc;
  };

  const formatCurrency = (price) => {
    return Number(price).toLocaleString("vi-VN", 
      // {
      // style: "currency",
      // currency: "VND",
      // }
    ) + " VND";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3  mb-3">
        <h2>Tours List</h2>
        <Button color="primary" size="m" onClick={toggleModal}>
          Add tour
        </Button>
      </div>
      <Table striped style={{ minWidth: "1400px" }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Title</th>
            <th>City</th>
            <th>Address</th>
            <th>Day</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Max Group Size</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tour?.map((tour) => (
            <tr key={tour._id}>
              <td>
                <img
                  src={tour.photo}
                  alt="Tour imgae"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>{tour.address}</td>
              <td>{tour.day}</td>
              <td>{truncateDesc(tour.desc)}</td>
              <td>{formatCurrency(tour.price)}</td>
              <td>{tour.maxGroupSize}</td>
              <td>
                {tour.featured ? (
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
                  onClick={() => openEditModal(tour)}
                >
                  {" "}
                  Edit{" "}
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteTour(tour._id)}
                >
                  {" "}
                  Delete{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal add tour */}
      <AddTourModal
        isOpen={modal}
        toggle={toggleModal}
        newTour={newTour}
        handleChange={handleChange}
        handleAddTour={handleAddTour}
        handlePhotoChange={handlePhotoChange}
        setNewTour={setNewTour}
      />
      {/* Modal edit tour */}
      <EditTourModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingTour={editingTour}
        setEditingTour={setEditingTour}
        handleEditTour={handleEditTour}
        handlePhotoChange={handlePhotoChange}
      />
    </div>
  );
};

export default ToursTable;
