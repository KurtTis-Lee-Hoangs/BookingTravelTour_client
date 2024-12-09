import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";

const BlogsTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: blog,
    loading,
    error,
  } = useFetch(`${BASE_URL}/blogs`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    image: null,
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [originalBlog, setOriginalBlog] = useState(null);
  const openEditModal = (blog) => {
    setOriginalBlog(blog); // Lưu bản sao dữ liệu gốc
    setEditingBlog(blog); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddBlog = async () => {
    const formData = new FormData();
    for (const key in newBlog) {
      formData.append(key, newBlog[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
        credentials: "include",
      });

      if (!responseAdd.ok) {
        throw new Error("Failed to add blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewBlog({
        title: "",
        image: null,
        description: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleImageChange = async (e, setBlogState) => {
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
          setBlogState((prev) => ({
            ...prev,
            image: data.secure_url, // Add the new photo URL to the state
          }));
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditBlog = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingBlog).forEach((key) => {
        if (editingBlog[key] !== originalBlog[key]) {
          updatedFields[key] = editingBlog[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/blogs/${editingBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortBlogs = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (blog) {
      blog.sort((a, b) => {
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
  const filteredBlogs = blog?.filter((blog) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div style={{ overflowX: "auto", width: "100%" }}>
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search by Title, City or Address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", boxShadow: "none" }}
        />
        <Button color="primary" size="m" onClick={toggleModal}>
          Add blog
        </Button>
      </div>
      {/* <Table striped style={{ minWidth: "2000px", display: "block" }}> */}
      <Table striped style={{ minWidth: "800px" }}>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => sortBlogs("title")}>Title {renderSortIcon("title")}</th>
            <th onClick={() => sortBlogs("description")}>Description {renderSortIcon("description")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs?.map((blog) => (
            <tr key={blog._id}>
              <td>
                <img
                  src={blog.image}
                  alt="Tour imgae"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{truncateText(blog.title)}</td>
              <td>{truncateText(blog.description)}...</td>
              <td>
                <Button
                  className="acction__btn"
                  color="primary"
                  size="sm"
                  onClick={() => openEditModal(blog)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddBlogModal
        isOpen={modal}
        toggle={toggleModal}
        newBlog={newBlog}
        handleInputChange={handleInputChange}
        handleAddBlog={handleAddBlog}
        handleImageChange={handleImageChange}
        setNewBlog={setNewBlog}
      />
      <EditBlogModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingBlog={editingBlog}
        setEditingBlog={setEditingBlog}
        handleEditBlog={handleEditBlog}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default BlogsTable;
