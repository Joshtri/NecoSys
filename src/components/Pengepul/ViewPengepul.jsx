import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

function ViewPengepul() {
  const { id } = useParams(); // Get the pengepul ID from the URL
  const [pengepul, setPengepul] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch pengepul detail from backend
  useEffect(() => {
    async function fetchPengepul() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengepul/${id}`); // Using axios.get
        if (response.data.success) {
          setPengepul(response.data.data); // Set the pengepul data from the API response
        } else {
          alert('Failed to fetch pengepul details');
        }
      } catch (error) {
        console.error('Error fetching pengepul details:', error);
        alert('Error fetching pengepul details');
      } finally {
        setLoading(false);
      }
    }

    fetchPengepul();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (!pengepul) {
    return <div>No data available</div>; // Show message if pengepul data is not available
  }

  return (
    <div className="container mt-4">
      <h2>Detail Data Pengepul</h2>
      <Link to="/admin/pengepul" className="btn btn-secondary mb-3">
        Back to List
      </Link>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{pengepul.id}</td>
          </tr>
          <tr>
            <th>Nama</th>
            <td>{pengepul.nama}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{pengepul.email}</td>
          </tr>
          <tr>
            <th>No Telepon</th>
            <td>{pengepul.noTelepon}</td>
          </tr>
          <tr>
            <th>Alamat</th>
            <td>{pengepul.alamat}</td>
          </tr>
          <tr>
            <th>Lokasi</th>
            <td>{pengepul.lokasi}</td>
          </tr>
          <tr>
            <th>Deskripsi Bank Sampah</th>
            <td>{pengepul.deskripsiBankSampah}</td>
          </tr>
          <tr>
            <th>Provinsi</th>
            <td>{pengepul.provinsi}</td>
          </tr>
          <tr>
            <th>Kabupaten</th>
            <td>{pengepul.kabupaten}</td>
          </tr>
          <tr>
            <th>Kecamatan</th>
            <td>{pengepul.kecamatan}</td>
          </tr>
          <tr>
            <th>Kelurahan</th>
            <td>{pengepul.kelurahan}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{pengepul.status}</td>
          </tr>
          <tr>
            <th>Dibuat Pada</th>
            <td>{new Date(pengepul.dibuatPada).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Diperbarui Pada</th>
            <td>{new Date(pengepul.diperbaruiPada).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewPengepul;
