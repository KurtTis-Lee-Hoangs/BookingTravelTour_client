import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

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

  return (
    // <div style={{ overflowX: "auto", width: "100%" }}>
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "400px" }}>
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
              <td>{tour.desc}</td>
              <td>{tour.price}</td>
              <td>{tour.maxGroupSize}</td>
              <td>
                <Button color="primary" size="sm" onClick={() => handleEdit(tour._id)}>
                  Edit
                </Button>{" "}
                <Button color="danger" size="sm" onClick={() => handleDelete(tour._id)}>
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
