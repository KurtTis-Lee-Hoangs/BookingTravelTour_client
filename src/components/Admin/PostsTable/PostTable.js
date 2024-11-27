import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const PostsTable = () => {
  // Fetch the users data from the API
  const { data: post, loading, error } = useFetch(`${BASE_URL}/posts`);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Functions to handle edit and delete actions
  const handleEdit = (id) => {
    // Logic to edit the tour with the given ID
    console.log(`Edit post with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete the tour with the given ID
    console.log(`Delete post with ID: ${id}`);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 9 ? words.slice(0, 9).join(" ") + "..." : description;
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 9 ? words.slice(0, 9).join(" ") + "..." : title;
  };

  return (
    // <div style={{ overflowX: "auto", width: "100%" }}>
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        <h2>Posts List</h2>
        <Button color="primary" size="m">
          Add post
        </Button>
      </div>
      {/* <Table striped style={{ minWidth: "2000px", display: "block" }}> */}
      <Table striped style={{ minWidth: "800px" }}>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {post?.map((post) => (
            <tr key={post._id}>
              <td>
                <img
                  src={post.images}
                  alt="Tour imgae"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{truncateTitle(post.title)}</td>
              <td>{truncateDescription(post.description)}...</td>
              <td>
                <Button
                  className="acction__btn"
                  color="primary"
                  size="sm"
                  onClick={() => handleEdit(post._id)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsTable;
