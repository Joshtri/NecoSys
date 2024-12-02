import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PenggunaData() {
  const [pengguna, setPengguna] = useState([]);

  // Fetch pengguna data from backend
  useEffect(() => {
    async function fetchPengguna() {
      const response = await fetch('/api/pengguna');
      const data = await response.json();
      setPengguna(data);
    }
    fetchPengguna();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Data Pengguna</h2>
      <Link to="/admin/pengguna/create" className="btn btn-primary mb-3">
        Add New Pengguna
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Peran</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pengguna.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.email}</td>
              <td>{item.peran}</td>
              <td>
                <Link to={`/admin/pengguna/${item.id}`} className="btn btn-info">
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

// Function to handle deleting pengguna (you can implement backend API call here)
async function handleDelete(id) {
  await fetch(`/api/pengguna/${id}`, {
    method: 'DELETE',
  });
  alert('Pengguna deleted');
}

export default PenggunaData;
