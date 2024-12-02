import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AnggotaData() {
  const [anggota, setAnggota] = useState([]);

  // Fetch anggota data from backend
  useEffect(() => {
    async function fetchAnggota() {
      const response = await fetch('/api/anggota');
      const data = await response.json();
      setAnggota(data);
    }
    fetchAnggota();
  }, []);

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

// Function to handle deleting anggota (you can implement backend API call here)
async function handleDelete(id) {
  await fetch(`/api/anggota/${id}`, {
    method: 'DELETE',
  });
  alert('Anggota deleted');
}

export default AnggotaData;
