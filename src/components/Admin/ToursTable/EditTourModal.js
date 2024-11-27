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
  editingTour,
  setEditingTour,
  handleEditTour,
  handlePhotoChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Tour</ModalHeader>
      <ModalBody>
        {editingTour && (
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={editingTour?.title}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={editingTour?.city}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, city: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={editingTour?.address}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, address: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="day">Day</Label>
              <Input
                type="number"
                name="day"
                id="day"
                min="1"
                value={editingTour?.day}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, day: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
            <Label for="photo">Photo</Label>
            <Input
              type="file"
              name="photo"
              id="photo"
              // onChange={handlePhotoChange}
              onChange={(e) => handlePhotoChange(e, setEditingTour)}
            />
          </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={editingTour?.desc}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, desc: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                min="1"
                value={editingTour?.price}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, price: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size</Label>
              <Input
                type="number"
                name="maxGroupSize"
                id="maxGroupSize"
                min="1"
                value={editingTour?.maxGroupSize}
                onChange={(e) =>
                  setEditingTour({
                    ...editingTour,
                    maxGroupSize: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="featured">Featured</Label>
              <Input
                type="select"
                name="featured"
                id="featured"
                value={editingTour?.featured} // Hiển thị giá trị hiện tại
                onChange={(e) =>
                  setEditingTour({ ...editingTour, featured: e.target.value })
                }
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </Input>
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditTour}>
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
