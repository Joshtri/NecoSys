import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteTransaksi({ show, onClose, onDelete, transaksiId }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this transaction? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onDelete(transaksiId); // Trigger delete
            onClose(); // Close the modal
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTransaksi;
