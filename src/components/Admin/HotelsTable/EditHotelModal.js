import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const EditTourModal = ({
  isOpen,
  toggle,
  editingHotel,
  setEditingHotel,
  handleEditHotel,
  handlePhotoChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Hotel</ModalHeader>
      <ModalBody>
        {editingHotel && (
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={editingHotel?.name}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={editingHotel?.phoneNumber}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, phoneNumber: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={editingHotel?.address}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, address: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo</Label>
              <Input
                type="file"
                name="photo"
                id="photo"
                // onChange={handlePhotoChange}
                onChange={(e) => handlePhotoChange(e, setEditingHotel)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={editingHotel?.description}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, description: e.target.value })
                }
              />
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditHotel}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTourModal;
