import React, { useState } from "react";
import { Table, Button, Input } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const UsersTable = () => {
  // Fetch the users data from the API
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: user,
    loading,
    error,
  } = useFetch(`${BASE_URL}/users`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editModal, setEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const openEditModal = (user) => {
    setOriginalUser(user); // Lưu bản sao dữ liệu gốc
    setEditingUser(user); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const responseAdd = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!responseAdd.ok) {
        throw new Error("Failed to add user");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
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

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Bắt đầu tải ảnh lên

      // Create FormData to send the image file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatarImg"); // Make sure this is allowed for unsigned uploads

      try {
        // Upload to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmbkgg1ac/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          // Update the editingUser state with the Cloudinary URL
          setEditingUser({
            ...editingUser,
            avatar: data.secure_url, // URL from Cloudinary
          });
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleEditUser = async () => {
    try {
      const updatedFields = {};

      // Check for changes in the user fields
      Object.keys(editingUser).forEach((key) => {
        if (editingUser[key] !== originalUser[key]) {
          updatedFields[key] = editingUser[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        // alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Refresh the page or reload the updated data
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 15 ? text.slice(0, 15) + "..." : text;
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortUsers = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (user) {
      user.sort((a, b) => {
        const valueA = a[key]?.toString().toLowerCase() || ""; // Chuyển về chuỗi thường
        const valueB = b[key]?.toString().toLowerCase() || ""; // Chuyển về chuỗi thường

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
  const filteredUsers = user?.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by Username or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", boxShadow: "none" }}
        />

        <Button color="primary" size="m" onClick={toggleModal}>
          Add user
        </Button>
      </div>
      <Table striped>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>Avatar</th>
            <th onClick={() => sortUsers("_id")}>ID {renderSortIcon("_id")}</th>
            <th onClick={() => sortUsers("username")}>
              Username {renderSortIcon("username")}
            </th>
            <th onClick={() => sortUsers("email")}>
              Email {renderSortIcon("email")}
            </th>
            <th onClick={() => sortUsers("role")}>
              Role {renderSortIcon("role")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{truncateText(user._id)}</td>
              <td>{truncateText(user.username)}</td>
              <td>{truncateText(user.email)}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  className="acction__btn"
                  color="primary"
                  size="sm"
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal add */}
      <AddUserModal
        isOpen={modal}
        toggle={toggleModal}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleAddUser={handleAddUser}
      />

      {/* Modal edit */}
      <EditUserModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        handleEditUser={handleEditUser}
        handleAvatarChange={handleAvatarChange}
      />
    </div>
  );
};

export default UsersTable;
