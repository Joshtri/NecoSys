import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddKategoriSampah from '../KategoriSampah/AddKategoriSampah';
import ViewKategoriSampah from '../KategoriSampah/ViewKategoriSampah';
import Breadcrumbs from '../Breadcrumbs';
import { FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import { PiHouseFill } from 'react-icons/pi';
import { FaGear } from 'react-icons/fa6';
import { FaClipboardList } from 'react-icons/fa';

function KategoriSampahData() {
  const [kategoriSampah, setKategoriSampah] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedKategoriSampah, setSelectedKategoriSampah] = useState(null);

  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaGear /> },
    { label: 'Data Kategori Sampah', icon: <FaClipboardList /> },
  ];

  // Fetch kategori sampah data from backend
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

  // Handle deleting kategori sampah
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/sampah/kategori/${id}`);
      setKategoriSampah((prevState) => prevState.filter((item) => item.id !== id));
      alert('Kategori Sampah deleted');
    } catch (error) {
      console.error('Error deleting kategori sampah: ', error);
      alert('Failed to delete Kategori Sampah');
    }
  };

  // Handle viewing kategori sampah details
  const handleView = (kategori) => {
    setSelectedKategoriSampah(kategori);
    setShowViewModal(true);
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="text-center">Data Kategori Sampah</h2>
      <hr />

      {/* Add Kategori Sampah Button */}
      <Link
        to="#"
        onClick={() => setShowModal(true)}
        className="mb-3 btn btn-primary align-items-center"
      >
        <FaPlusCircle className="me-2" /> Add New Kategori Sampah
      </Link>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kategoriSampah.length > 0 ? (
            kategoriSampah.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.deskripsi}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    {/* View Button */}
                    <Button
                      variant="info"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => handleView(item)}
                    >
                      <FaEye className="me-2" /> View
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash className="me-2" /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Kategori Sampah Found
              </td>
            </tr>
          )}
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
