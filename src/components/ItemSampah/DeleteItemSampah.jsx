import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteItemSampah({ show, handleClose, handleDeleteItem, itemId }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item Sampah</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this Item Sampah?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={() => handleDeleteItem(itemId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteItemSampah;
