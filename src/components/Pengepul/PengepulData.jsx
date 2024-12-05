import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

function PengepulData() {
  const [pengepul, setPengepul] = useState([]);

  // Fetch pengepul data from backend using axios
  useEffect(() => {
    async function fetchPengepul() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengepul`); // Using axios.get
        if (response.data.success) {
          setPengepul(response.data.data); // Set the pengepul data from the API response
        } else {
          alert('Failed to fetch pengepul data');
        }
      } catch (error) {
        console.error('Error fetching pengepul data:', error);
        alert('Error fetching pengepul data');
      }
    }

    fetchPengepul();
  }, []);

  // Function to handle deleting pengepul using axios
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/pengepul/${id}`); // Using axios.delete

      if (response.status === 200) {
        // Remove the deleted pengepul from the list
        setPengepul(pengepul.filter(item => item.id !== id));
        alert('Pengepul deleted successfully');
      } else {
        alert('Failed to delete pengepul');
      }
    } catch (error) {
      console.error('Error deleting pengepul:', error);
      alert('Error deleting pengepul');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Data Pengepul</h2>
      <Link to="/admin/pengepul/create" className="btn btn-primary mb-3">
        Add New Pengepul
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Alamat</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pengepul.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.email}</td>
              <td>{item.noTelepon}</td>
              <td>{item.alamat}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/admin/pengepul/${item.id}`} className="btn btn-info">
                  View
                </Link>
                <Button variant="danger" onClick={() => handleDelete(item.id)} className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PengepulData;
