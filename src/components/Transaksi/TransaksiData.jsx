import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteTransaksi from './DeleteTransaksi';
import UpdateStatus from './UpdateStatus';

function TransaksiData() {
  const [transaksi, setTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false); // To control the delete modal visibility
  const [showStatusModal, setShowStatusModal] = useState(false); // To control the update status modal visibility
  const [transaksiIdToDelete, setTransaksiIdToDelete] = useState(null); // Store the ID of the transaksi to be deleted
  const [transaksiIdToUpdate, setTransaksiIdToUpdate] = useState(null); // Store the ID of the transaksi to update
  const [newStatus, setNewStatus] = useState(''); // Store the new status

  // Fetch transaksi data from backend
  useEffect(() => {
    fetchTransaksi();
  }, []);

  async function fetchTransaksi() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/transaksi`);
      setTransaksi(response.data.data || []);
    } catch (error) {
      console.error('Error fetching transaksi data:', error);
      alert('Error fetching transaksi data');
    }
  }

  // Function to handle showing the delete modal
  function handleShowDeleteModal(id) {
    setTransaksiIdToDelete(id);
    setShowModal(true);
  }

  // Function to handle showing the update status modal
  function handleShowStatusModal(id, currentStatus) {
    setTransaksiIdToUpdate(id);
    setNewStatus(currentStatus);
    setShowStatusModal(true);
  }

  // Function to handle updating the status
  async function handleUpdateStatus() {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/transaksi/${transaksiIdToUpdate}/status`,
        { newStatus } // Body request
      );
  
      if (response.status === 200) {
        alert('Status updated successfully');
        setTransaksi(
          transaksi.map((item) =>
            item.id === transaksiIdToUpdate ? { ...item, statusTransaksi: newStatus } : item
          )
        );
        setShowStatusModal(false); // Close modal
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating transaksi status:', error);
      alert('Error updating transaksi status');
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
                    variant="success"
                    onClick={() => handleShowStatusModal(item.id, item.statusTransaksi)}
                    className="ms-2"
                  >
                    Update Status
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(item.id)}
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

      {/* Delete Confirmation Modal */}
      <DeleteTransaksi
        show={showModal}
        onClose={() => setShowModal(false)}
        onDelete={(id) => {
          setShowModal(false);
          setTransaksi(transaksi.filter((item) => item.id !== id));
        }}
        transaksiId={transaksiIdToDelete}
      />

      {/* Update Status Modal */}
      <UpdateStatus
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSave={handleUpdateStatus}
        currentStatus={newStatus}
        setNewStatus={setNewStatus}
      />
    </div>
  );
}

export default TransaksiData;
