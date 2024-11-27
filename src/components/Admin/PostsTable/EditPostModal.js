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

const EditPostModal = ({
  isOpen,
  toggle,
  editingPost,
  setEditingPost,
  handleEditPost,
  handleImageChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Tour</ModalHeader>
      <ModalBody>
        {editingPost && (
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={editingPost?.title}
                onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Imgae</Label>
              <Input
                type="file"
                name="image"
                id="image"
                // onChange={handlePhotoChange}
                onChange={(e) => handleImageChange(e, setEditingPost)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={editingPost?.description}
                onChange={(e) =>
                    setEditingPost({ ...editingPost, description: e.target.value })
                }
              />
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditPost}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPostModal;
