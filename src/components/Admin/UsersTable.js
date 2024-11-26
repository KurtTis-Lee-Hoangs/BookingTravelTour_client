import React, { useState } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const UsersTable = () => {
  // Fetch the users data from the API
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: user,
    loading,
    error,
  } = useFetch(`${BASE_URL}/users`, refreshKey);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingUser, setEditingUser] = useState(null);
  const openEditModal = (user) => {
    setOriginalUser(user); // Lưu bản sao dữ liệu gốc
    setEditingUser(user); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };
  const [originalUser, setOriginalUser] = useState(null);

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

  const handleEditUser = async () => {
    try {
      // So sánh dữ liệu gốc với dữ liệu đã chỉnh sửa
      const updatedFields = {};
      // Kiểm tra và cập nhật các trường khác ngoài mật khẩu
      Object.keys(editingUser).forEach((key) => {
        if (editingUser[key] !== originalUser[key]) {
          updatedFields[key] = editingUser[key];
        }
      });

      // Nếu mật khẩu thay đổi, thì cập nhật password
      if (
        editingUser.password &&
        editingUser.password !== originalUser.password
      ) {
        updatedFields.password = editingUser.password;
      } else {
        // Nếu mật khẩu không thay đổi, loại bỏ trường password khỏi cập nhật
        delete updatedFields.password;
      }

      // Kiểm tra xem có trường nào cần cập nhật không
      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
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
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Đóng modal sau khi cập nhật
    } catch (error) {
      console.error("Error updating user:", error);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ overflowY: "auto", maxHeight: "500px" }}>
      <div className="d-flex gap-3 mb-3">
        <h2>Users List</h2>
        <Button color="primary" size="m" onClick={toggleModal}>
          Add user
        </Button>
      </div>
      <Table striped>
        {/* Bảng người dùng */}
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((user) => (
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
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button className="acction__btn" color="primary" size="sm" onClick={() => openEditModal(user)} >
                  Edit
                </Button>
                <Button color="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddUser}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal edit */}
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Edit User</ModalHeader>
        <ModalBody>
          {editingUser && ( // Chỉ hiển thị form khi editingUser có giá trị
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={editingUser?.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="avatar">Avatar Url</Label>
                <Input
                  type="text"
                  name="avatar"
                  id="avatar"
                  value={editingUser?.avatar}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, avatar: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  id="password"
                  value={editingUser?.password}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, password: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  value={editingUser?.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Input>
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditUser}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsersTable;
