import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../Breadcrumbs';
import { FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import { PiHouseFill } from 'react-icons/pi';
import { FaGear } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';

function PengepulData() {
  const [pengepul, setPengepul] = useState([]);

  // Breadcrumb paths
  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaGear /> },
    { label: 'Data Pengepul', icon: <FaUsers /> },
  ];

  // Fetch pengepul data from backend
  useEffect(() => {
    async function fetchPengepul() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengepul`);
        if (response.data.success) {
          setPengepul(response.data.data);
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

  // Function to handle deleting pengepul
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/pengepul/${id}`);
      if (response.status === 200) {
        setPengepul(pengepul.filter((item) => item.id !== id));
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
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="text-center">Data Pengepul</h2>
      <hr />

      {/* Add Pengepul Button */}
      <Link to="/admin/pengepul/create" className="btn btn-primary align-items-center mb-3">
        <FaPlusCircle className="me-2" /> Add New Pengepul
      </Link>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Alamat</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pengepul.length > 0 ? (
            pengepul.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.noTelepon}</td>
                <td>{item.alamat}</td>
                <td>{item.status}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    {/* View Button */}
                    <Link
                      to={`/admin/pengepul/${item.id}`}
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
              <td colSpan="7" className="text-center">
                No pengepul found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default PengepulData;
