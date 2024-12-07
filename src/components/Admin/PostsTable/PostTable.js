import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddPostModal from "./AddPostModal";
import EditPostModal from "./EditPostModal";

const PostsTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: post,
    loading,
    error,
  } = useFetch(`${BASE_URL}/posts`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    image: null,
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);
  const openEditModal = (post) => {
    setOriginalPost(post); // Lưu bản sao dữ liệu gốc
    setEditingPost(post); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPost = async () => {
    const formData = new FormData();
    for (const key in newPost) {
      formData.append(key, newPost[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
        credentials: "include",
      });

      if (!responseAdd.ok) {
        throw new Error("Failed to add post");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewPost({
        title: "",
        image: null,
        description: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleImageChange = async (e, setPostState) => {
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
          setPostState((prev) => ({
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

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingPost).forEach((key) => {
        if (editingPost[key] !== originalPost[key]) {
          updatedFields[key] = editingPost[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/posts/${editingPost._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortPosts = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (post) {
      post.sort((a, b) => {
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
  const filteredPosts = post?.filter((post) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm)
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
          Add post
        </Button>
      </div>
      {/* <Table striped style={{ minWidth: "2000px", display: "block" }}> */}
      <Table striped style={{ minWidth: "800px" }}>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => sortPosts("title")}>Title {renderSortIcon("title")}</th>
            <th onClick={() => sortPosts("description")}>Description {renderSortIcon("description")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts?.map((post) => (
            <tr key={post._id}>
              <td>
                <img
                  src={post.image}
                  alt="Tour imgae"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{truncateText(post.title)}</td>
              <td>{truncateText(post.description)}...</td>
              <td>
                <Button
                  className="acction__btn"
                  color="primary"
                  size="sm"
                  onClick={() => openEditModal(post)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddPostModal
        isOpen={modal}
        toggle={toggleModal}
        newPost={newPost}
        handleInputChange={handleInputChange}
        handleAddPost={handleAddPost}
        handleImageChange={handleImageChange}
        setNewPost={setNewPost}
      />
      <EditPostModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
        handleEditPost={handleEditPost}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default PostsTable;
