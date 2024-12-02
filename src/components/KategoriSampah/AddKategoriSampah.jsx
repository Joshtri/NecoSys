import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';



function AddKategoriSampah({ show, handleClose, handleSubmit }) {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Ensure the data is valid
    if (!nama || !deskripsi) {
      alert('Nama and Deskripsi are required!');
      return;
    }

    // Call the handleSubmit function passed via props
    const data = { nama, deskripsi };
    await handleSubmit(data);

    // Reset the form fields
    setNama('');
    setDeskripsi('');

    // Close the modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Kategori Sampah</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="kategoriNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="kategoriDeskripsi">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Kategori Sampah
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddKategoriSampah;
