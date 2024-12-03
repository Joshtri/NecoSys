import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditItemSampah({ show, handleClose, item, handleUpdateItem }) {
  const [nama, setNama] = useState(item.nama || '');
  const [hargaPerKg, setHargaPerKg] = useState(item.hargaPerKg || '');
  const [kategoriSampah, setKategoriSampah] = useState(item.kategoriSampah?.nama || '');

  useEffect(() => {
    if (item) {
      setNama(item.nama);
      setHargaPerKg(item.hargaPerKg);
      setKategoriSampah(item.kategoriSampah?.nama);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = { nama, hargaPerKg, kategoriSampah };

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/item-sampah/${item.id}`, updatedItem);

      if (response.status === 200) {
        handleUpdateItem(response.data.data);  // Update the item in the list
        alert('Item Sampah updated successfully');
        handleClose();
      } else {
        alert('Failed to update item sampah');
      }
    } catch (error) {
      console.error('Error updating item sampah:', error);
      alert('Error updating item sampah');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item Sampah</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="itemNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="itemHargaPerKg">
            <Form.Label>Harga Per Kg</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Harga Per Kg"
              value={hargaPerKg}
              onChange={(e) => setHargaPerKg(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="itemKategoriSampah">
            <Form.Label>Kategori Sampah</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Kategori Sampah"
              value={kategoriSampah}
              onChange={(e) => setKategoriSampah(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditItemSampah;
