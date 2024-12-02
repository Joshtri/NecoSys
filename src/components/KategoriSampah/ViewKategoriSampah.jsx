import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ViewKategoriSampah({ show, handleClose, kategoriSampah }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Kategori Sampah</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {kategoriSampah.id}</p>
        <p><strong>Nama:</strong> {kategoriSampah.nama}</p>
        <p><strong>Deskripsi:</strong> {kategoriSampah.deskripsi}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewKategoriSampah;
