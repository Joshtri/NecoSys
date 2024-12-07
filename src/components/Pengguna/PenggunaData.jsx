import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../Breadcrumbs';
import { FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import { PiHouseFill } from 'react-icons/pi';
import { FaGear } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';

function PenggunaData() {
  const [pengguna, setPengguna] = useState([]);

  // Breadcrumb paths
  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaGear /> },
    { label: 'Data Pengguna', icon: <IoPeople /> },
  ];

  // Fetch pengguna data from backend
  useEffect(() => {
    async function fetchPengguna() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengguna`);
        if (response.data.status === 'success') {
          setPengguna(response.data.data);
        } else {
          alert('Failed to fetch pengguna data');
        }
      } catch (error) {
        console.error('Error fetching pengguna data:', error);
        alert('Error fetching pengguna data');
      }
    }

    fetchPengguna();
  }, []);

  // Function to handle deleting pengguna
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/pengguna/${id}`);
      if (response.status === 200) {
        setPengguna(pengguna.filter((item) => item.id !== id));
        alert('Pengguna deleted successfully');
      } else {
        alert('Failed to delete pengguna');
      }
    } catch (error) {
      console.error('Error deleting pengguna:', error);
      alert('Error deleting pengguna');
    }
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="text-center">Data Pengguna</h2>
      <hr />

      {/* Add Pengguna Button */}
      <Link to="/admin/pengguna/create" className="btn btn-primary d-flex align-items-center mb-3">
        <FaPlusCircle className="me-2" /> Add New Pengguna
      </Link>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Peran</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pengguna.length > 0 ? (
            pengguna.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.peran}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    {/* View Button */}
                    <Link
                      to={`/admin/pengguna/${item.id}`}
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
                No pengguna found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default PenggunaData;
