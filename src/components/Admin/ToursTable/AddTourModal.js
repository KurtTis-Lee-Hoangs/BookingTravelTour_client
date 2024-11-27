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

const AddTourModal = ({
  isOpen,
  toggle,
  newTour,
  handleChange,
  handleAddTour,
  handlePhotoChange,
  setNewTour
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Tour</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="day">Day</Label>
            <Input
              type="number"
              name="day"
              id="day"
              min="1"
              value={newTour?.day}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo</Label>
            <Input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              // onChange={handlePhotoChange}
              onChange={(e) => handlePhotoChange(e, setNewTour)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input
              type="textarea"
              name="desc"
              id="desc"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              min="1"
              value={newTour?.price}
              onChange={handleChange}
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
              value={newTour?.maxGroupSize}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="featured">Featured</Label>
            <Input
              type="select"
              name="featured"
              id="featured"
              value={newTour?.featured} // Hiển thị giá trị hiện tại
              onChange={handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddTour}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTourModal;
