import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useUserProfile from '../../hooks/useUserProfile';

function AddItemSampah({ show, handleClose, handleAddItem }) {
  const [nama, setNama] = useState('');
  const [hargaPerKg, setHargaPerKg] = useState('');
  const [kategoriSampahId, setKategoriSampahId] = useState('');
  const [kategoriSampahList, setKategoriSampahList] = useState([]); // List of categories
  const userProfile = useUserProfile(); // Get user profile data
  
  // Fetch categories from API
  useEffect(() => {
    const fetchKategoriSampah = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sampah/kategori`);
        if (response.data.status === 'success') {
          setKategoriSampahList(response.data.data); // Assuming response.data.data is an array of categories
        } else {
          alert('Failed to fetch Kategori Sampah');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Error fetching Kategori Sampah');
      }
    };

    fetchKategoriSampah();
  }, []); // Only run once when component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Debug: Log the data being sent to the backend
    console.log('Sending new item:', { nama, hargaPerKg, kategoriSampahId, pengepulId: userProfile.id });
  
    // Check if kategoriSampahId is valid
    if (!kategoriSampahId) {
      alert('Please select a valid Kategori Sampah');
      return;
    }

    // Prepare the new item data with pengepulId
    const newItem = { 
      nama,
      hargaPerKg: Number(hargaPerKg), // Ensure hargaPerKg is a number
      kategoriSampahId,
      pengepulId: userProfile.id, // Add pengepulId from user profile
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/item/sampah`, newItem, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Debug: Check server response
      console.log('Server Response:', response.data);
  
      if (response.data.status === 'success') {
        handleAddItem(response.data.data); // Add the new item to the parent state
        handleClose(); // Close the modal
      } else {
        alert('Failed to add Item Sampah');
      }
    } catch (error) {
      console.error('Error adding item sampah:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Error adding item sampah';
      alert(errorMessage);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item Sampah</Modal.Title>
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
              as="select"
              value={kategoriSampahId}
              onChange={(e) => setKategoriSampahId(e.target.value)}
              required
            >
              <option value="">Select Kategori Sampah</option>
              {kategoriSampahList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.nama}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Item Sampah
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddItemSampah;
