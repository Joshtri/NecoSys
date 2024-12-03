import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteTransaksi from './DeleteTransaksi'; // Import the modal component

function TransaksiData() {
  const [transaksi, setTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [transaksiIdToDelete, setTransaksiIdToDelete] = useState(null); // Store the ID of the transaksi to be deleted

  // Fetch transaksi data from backend
  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transaksi`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaksi data');
        }
        const data = await response.json();
        console.log('Fetched transaksi data:', data);

        if (Array.isArray(data.data)) {
          setTransaksi(data.data);
        } else {
          console.error('Expected array in data, but received:', data);
          alert('Data transaksi is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching transaksi data:', error);
        alert('Error fetching transaksi data');
      }
    }

    fetchTransaksi();
  }, []);

  // Function to handle showing the modal with the transaction ID
  function handleShowDeleteModal(id) {
    setTransaksiIdToDelete(id);
    setShowModal(true);
  }

  // Function to handle deleting the transaksi
  async function handleDelete(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transaksi/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaksi');
      }
      alert('Transaksi deleted');
      setTransaksi(transaksi.filter((item) => item.id !== id)); // Remove deleted item from state
    } catch (error) {
      console.error('Error deleting transaksi:', error);
      alert('Error deleting transaksi');
    }
  }

  return (
    <div className="container mt-4">
      <h2>Data Transaksi</h2>
      <Link to="/transaksi/add" className="mb-3 btn btn-primary">
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transaksi) && transaksi.length > 0 ? (
            transaksi.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.anggota ? item.anggota.nama : 'Unknown'}</td>
                <td>
                  {item.itemTransaksi.length > 0 ? (
                    item.itemTransaksi.map((itemTrans, idx) => (
                      <div key={idx}>
                        <strong>{itemTrans.itemSampah.nama}</strong>
                      </div>
                    ))
                  ) : (
                    <span>No items</span>
                  )}
                </td>
                <td>
                  {item.itemTransaksi.length > 0 ? (
                    item.itemTransaksi.map((itemTrans, idx) => (
                      <div key={idx}>
                        {itemTrans.jumlah}
                      </div>
                    ))
                  ) : (
                    <span>No items</span>
                  )}
                </td>
                <td>{item.totalTransaksi}</td>
                <td>{item.statusTransaksi}</td>
                <td>
                  <Link to={`/transaksi/view/${item.id}`} className="btn btn-info">
                    View
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(item.id)} // Show modal on delete click
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No transaksi found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Include the Delete Confirmation Modal */}
      <DeleteTransaksi
        show={showModal}
        onClose={() => setShowModal(false)} // Close modal
        onDelete={handleDelete} // Call handleDelete on confirmation
        transaksiId={transaksiIdToDelete} // Pass the ID to the modal
      />
    </div>
  );
}

export default TransaksiData;
