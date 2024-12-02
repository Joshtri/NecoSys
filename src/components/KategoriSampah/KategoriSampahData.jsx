import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios
import AddKategoriSampah from '../KategoriSampah/AddKategoriSampah'; // Import the modal component
import ViewKategoriSampah from '../KategoriSampah/ViewKategoriSampah'; // Import ViewKategoriSampah modal


function KategoriSampahData() {
  const [kategoriSampah, setKategoriSampah] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);  // State for the View modal
  const [selectedKategoriSampah, setSelectedKategoriSampah] = useState(null);  // State for selected kategori sampah

  // Fetch kategori sampah data from backend using axios
  useEffect(() => {
    async function fetchKategoriSampah() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sampah/kategori`);
        if (response.data.status === 'success') {
          setKategoriSampah(response.data.data);
        } else {
          alert('Failed to fetch kategori sampah');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        alert('Error fetching kategori sampah data');
      }
    }

    fetchKategoriSampah();
  }, []);

  // Handle adding new kategori sampah
  const handleAddKategoriSampah = async (newData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/sampah/kategori`, newData);
      if (response.data.status === 'success') {
        setKategoriSampah((prevState) => [...prevState, response.data.data]);
        alert('Kategori Sampah added successfully');
      } else {
        alert('Failed to add Kategori Sampah');
      }
    } catch (error) {
      console.error('Error adding kategori sampah: ', error);
      alert('Failed to add Kategori Sampah');
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sampah/kategori/${id}`);
      setKategoriSampah((prevState) => prevState.filter(item => item.id !== id));
      alert('Kategori Sampah deleted');
    } catch (error) {
      console.error('Error deleting kategori sampah: ', error);
      alert('Failed to delete Kategori Sampah');
    }
  };

    // Handle viewing kategori sampah details
  const handleView = (kategori) => {
    setSelectedKategoriSampah(kategori);  // Set the selected kategori sampah
    setShowViewModal(true);  // Show the view modal
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
                <Button variant='info' onClick={()=> handleView(item)} className="btn btn-info">
                  View
                </Button>
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

      {/* View Kategori Sampah Modal */}
      {selectedKategoriSampah && (
        <ViewKategoriSampah
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          kategoriSampah={selectedKategoriSampah}
        />
      )}
    </div>
  );
}

export default KategoriSampahData;
