import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TransaksiData() {
  const [transaksi, setTransaksi] = useState([]);  // Default state is an empty array
  const [anggotaList, setAnggotaList] = useState([]);  // Daftar anggota untuk dipilih
  const [itemSampahList, setItemSampahList] = useState([]);  // Daftar item sampah untuk dipilih

  // Fetch transaksi data from backend
  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transaksi`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaksi data');
        }
        const data = await response.json();
        
        // Ensure we access the 'data' key from the response
        console.log('Fetched transaksi data:', data);

        // Check if 'data' is an array and set state accordingly
        if (Array.isArray(data.data)) {
          setTransaksi(data.data);  // Use 'data' key from the response
        } else {
          console.error('Expected array in data, but received:', data);
          alert('Data transaksi is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching transaksi data:', error);
        alert('Error fetching transaksi data');
      }
    }

    async function fetchAnggota() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/anggota`);
        if (!response.ok) {
          throw new Error('Failed to fetch anggota data');
        }
        const data = await response.json();
        setAnggotaList(data);
      } catch (error) {
        console.error('Error fetching anggota data:', error);
        alert('Error fetching anggota data');
      }
    }

    async function fetchItemSampah() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/sampah`);
        if (!response.ok) {
          throw new Error('Failed to fetch item sampah data');
        }
        const data = await response.json();
        setItemSampahList(data);
      } catch (error) {
        console.error('Error fetching item sampah data:', error);
        alert('Error fetching item sampah data');
      }
    }

    fetchTransaksi();
    fetchAnggota();
    fetchItemSampah();
  }, []);

  // Function to handle deleting transaksi
  async function handleDelete(id) {
    await fetch(`/api/transaksi/${id}`, {
      method: 'DELETE',
    });
    alert('Transaksi deleted');
    setTransaksi(transaksi.filter((item) => item.id !== id));
  }

  return (
    <div className="container mt-4">
      <h2>Data Transaksi</h2>
      <Link to='/transaksi/add' className="mb-3 btn btn-primary">
        Add New Transaksi
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Anggota</th>
            <th>Item Sampah</th>
            <th>Jumlah</th>
            <th>Total Harga</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transaksi) && transaksi.length > 0 ? (
            transaksi.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.anggota?.nama}</td>
                <td>{item.itemSampah?.nama}</td>
                <td>{item.jumlah}</td>
                <td>{item.totalHarga}</td>
                <td>
                  <Link to={`/admin/transaksi/${item.id}`} className="btn btn-info">
                    View
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(item.id)} className="ms-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No transaksi found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TransaksiData;
