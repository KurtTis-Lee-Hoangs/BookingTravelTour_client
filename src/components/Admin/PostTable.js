import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const UsersTable = () => {
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

  return (
    // <div style={{ overflowX: "auto", width: "100%" }}>
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "400px" }}>
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
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>
                <Button color="primary" size="sm" onClick={() => handleEdit(post._id)}>
                  Edit
                </Button>{" "}
                <Button color="danger" size="sm" onClick={() => handleDelete(post._id)}>
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

export default UsersTable;
