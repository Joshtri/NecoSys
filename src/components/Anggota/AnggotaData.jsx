import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../Breadcrumbs';
import { FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import { PiHouseFill } from 'react-icons/pi';
import { FaGear } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';

function AnggotaData() {
  const [anggota, setAnggota] = useState([]);

  // Breadcrumb paths
  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaGear /> },
    { label: 'Data Anggota', icon: <IoPeopleSharp /> },
  ];

  // Fetch anggota data from backend
  useEffect(() => {
    async function fetchAnggota() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/anggota`);
        if (response.data.status === 'success') {
          setAnggota(response.data.data);
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

  // Function to handle deleting anggota
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/anggota/${id}`);
      if (response.status === 200) {
        setAnggota(anggota.filter((item) => item.id !== id));
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
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="text-center">Data Anggota</h2>
      <hr />

      {/* Add Anggota Button */}
      <Link to="/admin/anggota/create" className="btn btn-primary align-items-center mb-3">
        <FaPlusCircle className="me-2" /> Add New Anggota
      </Link>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {anggota.length > 0 ? (
            anggota.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.noTelepon}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2"> {/* Wrapper dengan Flexbox untuk tombol */}
                    {/* View Button */}
                    <Link
                      to={`/admin/anggota/${item.id}`}
                      className="btn btn-info d-flex align-items-center btn-sm"
                    >
                      <FaEye className="me-2" /> View
                    </Link>

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
              <td colSpan="5" className="text-center">
                No anggota found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AnggotaData;
