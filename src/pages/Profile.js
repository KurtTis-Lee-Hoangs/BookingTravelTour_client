import React, { useEffect, useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/profile.css";
import useFetch from "../hooks/useFetch";

const ProfilePage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const {
    data: userData,
    loading,
    error,
  } = useFetch(`${BASE_URL}/users/${user._id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      avatar,
      username,
      ...(password && { password })  // Only include password if it is non-empty
    };

    try {
      const response = await fetch(userData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Profile updated successfully!");

        // After profile update, log the user out (clear context and localStorage)
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");

        // Optionally, redirect the user to the login page or home page after logout
        window.location.href = "/login"; // or any route you prefer
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <Container className="profile-page">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Profile Settings</h2>

          {/* Form to update user information */}
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <img
                src={
                  avatar ||
                  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1730600707~exp=1730604307~hmac=63d2ed023c4a722f90f9c59a0417ca2eba185a3b9323bf93f4a6ff988c6bd6d7&w=740"
                }
                alt="User Avatar"
                className="profile-photo mb-3"
              />
            </div>

            <FormGroup>
              <Label for="avatar">Avatar</Label>
              <Input
                type="text"
                name="avatar"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={user.email}
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button type="submit" className="btn primary__btn m-2">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
