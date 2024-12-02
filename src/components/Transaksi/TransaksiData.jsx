import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TransaksiData() {
  const [transaksi, setTransaksi] = useState([]);

  // Fetch transaksi data from backend
  useEffect(() => {
    async function fetchTransaksi() {
      const response = await fetch('/api/transaksi');
      const data = await response.json();
      setTransaksi(data);
    }
    fetchTransaksi();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Data Transaksi</h2>
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
          {transaksi.map((item) => (
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
          ))}
        </tbody>
      </Table>
    </div>
  );
}

// Function to handle deleting transaksi (you can implement backend API call here)
async function handleDelete(id) {
  await fetch(`/api/transaksi/${id}`, {
    method: 'DELETE',
  });
  alert('Transaksi deleted');
}

export default TransaksiData;
