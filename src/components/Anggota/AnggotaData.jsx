import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios

function AnggotaData() {
  const [anggota, setAnggota] = useState([]);

  // Fetch anggota data from backend using axios
  useEffect(() => {
    async function fetchAnggota() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/anggota`);  // Using axios.get
        if (response.data.status === 'success') {
          setAnggota(response.data.data);  // Set the anggota data from the API response
        } else {
          alert('Failed to fetch anggota data');
        }
      } catch (error) {
        console.error('Error fetching anggota data:', error);
        alert('Error fetching anggota data');
      }
    }

    fetchAnggota();
  }, []);

  // Function to handle deleting anggota using axios
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/anggota/${id}`);  // Using axios.delete

      if (response.status === 200) {
        // Remove the deleted anggota from the list
        setAnggota(anggota.filter(item => item.id !== id));
        alert('Anggota deleted successfully');
      } else {
        alert('Failed to delete anggota');
      }
    } catch (error) {
      console.error('Error deleting anggota:', error);
      alert('Error deleting anggota');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Data Anggota</h2>
      <Link to="/admin/anggota/create" className="btn btn-primary mb-3">
        Add New Anggota
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {anggota.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.email}</td>
              <td>{item.noTelepon}</td>
              <td>
                <Link to={`/admin/anggota/${item.id}`} className="btn btn-info">
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

export default AnggotaData;
