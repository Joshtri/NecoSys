import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ViewItemSampah({ show, handleClose, item }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Item Sampah</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Nama:</strong> {item.nama}</p>
        <p><strong>Harga Per Kg:</strong> {item.hargaPerKg}</p>
        <p><strong>Kategori Sampah:</strong> {item.kategoriSampah?.nama}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewItemSampah;
