import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddKategoriSampah from '../KategoriSampah/AddKategoriSampah'; // Import the modal component

function KategoriSampahData() {
  const [kategoriSampah, setKategoriSampah] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch kategori sampah data from backend
  useEffect(() => {
    async function fetchKategoriSampah() {
      const response = await fetch('/api/kategori-sampah');
      const data = await response.json();
      setKategoriSampah(data);
    }
    fetchKategoriSampah();
  }, []);

  // Handle adding new kategori sampah
  const handleAddKategoriSampah = async (newData) => {
    const response = await fetch('/api/kategori-sampah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      // Refresh the list of kategori sampah after adding new one
      const data = await response.json();
      setKategoriSampah((prevState) => [...prevState, data]);
      alert('Kategori Sampah added successfully');
    } else {
      alert('Failed to add Kategori Sampah');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/kategori-sampah/${id}`, {
      method: 'DELETE',
    });
    setKategoriSampah((prevState) => prevState.filter(item => item.id !== id));
    alert('Kategori Sampah deleted');
  };

  return (
    <div className="container mt-4">
      <h2>Data Kategori Sampah</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Kategori Sampah
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kategoriSampah.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.deskripsi}</td>
              <td>
                <Link to={`/admin/kategori-sampah/${item.id}`} className="btn btn-info">
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

      {/* Add Kategori Sampah Modal */}
      <AddKategoriSampah
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleAddKategoriSampah}
      />
    </div>
  );
}

export default KategoriSampahData;
