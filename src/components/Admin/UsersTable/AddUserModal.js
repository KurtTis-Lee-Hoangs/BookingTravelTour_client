// import React from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";

// const AddUserModal = ({
//   isOpen,
//   toggle,
//   newUser,
//   handleInputChange,
//   handleAddUser,
// }) => {
//   return (
//     <Modal isOpen={isOpen} toggle={toggle}>
//       <ModalHeader toggle={toggle}>Add New User</ModalHeader>
//       <ModalBody>
//         <Form>
//           <FormGroup>
//             <Label for="username">Username</Label>
//             <Input
//               type="text"
//               name="username"
//               id="username"
//               value={newUser.username}
//               onChange={handleInputChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="email">Email</Label>
//             <Input
//               type="email"
//               name="email"
//               id="email"
//               value={newUser.email}
//               onChange={handleInputChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="password">Password</Label>
//             <Input
//               type="password"
//               name="password"
//               id="password"
//               value={newUser.password}
//               onChange={handleInputChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="role">Role</Label>
//             <Input
//               type="select"
//               name="role"
//               id="role"
//               value={newUser.role}
//               onChange={handleInputChange}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </Input>
//           </FormGroup>
//         </Form>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="primary" onClick={handleAddUser}>
//           Save
//         </Button>{" "}
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default AddUserModal;

import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const AddUserModal = ({
  newUser,
  handleInputChange,
  handleAddUser,
  handleCancel,
}) => {
  return (
    <div className="add-user-form mb-4 mt-4">
      <h2>Add New User</h2>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={newUser.username}
                onChange={handleInputChange}
                style={{
                  maxWidth: "70%",
                  fontSize: "14px",
                  padding: "5px",
                  boxShadow: "none",
                }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={newUser.email}
                onChange={handleInputChange}
                style={{
                  maxWidth: "70%",
                  fontSize: "14px",
                  padding: "5px",
                  boxShadow: "none",
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={newUser.password}
                onChange={handleInputChange}
                style={{
                  maxWidth: "70%",
                  fontSize: "14px",
                  padding: "5px",
                  boxShadow: "none",
                }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={newUser.role}
                onChange={handleInputChange}
                style={{
                  maxWidth: "70%",
                  fontSize: "14px",
                  padding: "5px",
                  boxShadow: "none",
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <div className="form-actions">
          <Button color="primary" onClick={handleAddUser}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddUserModal;
