import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ItemSampahData() {
  const [itemSampah, setItemSampah] = useState([]);

  // Fetch item sampah data from backend
  useEffect(() => {
    async function fetchItemSampah() {
      const response = await fetch('/api/item-sampah');
      const data = await response.json();
      setItemSampah(data);
    }
    fetchItemSampah();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Data Item Sampah</h2>
      <Link to="/admin/item-sampah/create" className="btn btn-primary mb-3">
        Add New Item Sampah
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Harga Per Kg</th>
            <th>Kategori Sampah</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemSampah.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.hargaPerKg}</td>
              <td>{item.kategoriSampah?.nama}</td>
              <td>
                <Link to={`/admin/item-sampah/${item.id}`} className="btn btn-info">
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

// Function to handle deleting item sampah (you can implement backend API call here)
async function handleDelete(id) {
  await fetch(`/api/item-sampah/${id}`, {
    method: 'DELETE',
  });
  alert('Item Sampah deleted');
}

export default ItemSampahData;
