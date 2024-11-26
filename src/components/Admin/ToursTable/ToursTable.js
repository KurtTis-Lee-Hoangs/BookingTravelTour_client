import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const UsersTable = () => {
  // Fetch the users data from the API
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours`);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Functions to handle edit and delete actions
  const handleEdit = (id) => {
    // Logic to edit the tour with the given ID
    console.log(`Edit tour with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete the tour with the given ID
    console.log(`Delete tour with ID: ${id}`);
  };

  const truncateDesc = (desc) => {
    const words = desc.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : desc;
  };

  return (
    // <div style={{ overflowX: "auto", width: "100%" }}>
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3  mb-3">
        <h2>Tours List</h2>
        <Button color="primary" size="m">
          Add tour
        </Button>
      </div>
      {/* <Table striped style={{ minWidth: "2000px", display: "block" }}> */}
      <Table striped style={{ minWidth: "1200px" }}>
        {/* Bảng người dùng */}
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
              <td>{tour.price}</td>
              <td>{tour.maxGroupSize}</td>
              <td>
                {/* Display Featured status */}
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
                  onClick={() => handleEdit(tour._id)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(tour._id)}
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

export default UsersTable;
