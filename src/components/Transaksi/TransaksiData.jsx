import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteTransaksi from './DeleteTransaksi';
import UpdateStatus from './UpdateStatus';
import useUserProfile from '../../hooks/useUserProfile';
import Breadcrumbs from '../Breadcrumbs';
import { PiHouseFill } from 'react-icons/pi';
import { IoPersonCircle } from 'react-icons/io5';
import { FaGear } from 'react-icons/fa6';
import { GrTransaction } from 'react-icons/gr';
import { FaBan, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons


function TransaksiData() {
  const [transaksi, setTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false); // To control the delete modal visibility
  const [showStatusModal, setShowStatusModal] = useState(false); // To control the update status modal visibility
  const [transaksiIdToDelete, setTransaksiIdToDelete] = useState(null); // Store the ID of the transaksi to be deleted
  const [transaksiIdToUpdate, setTransaksiIdToUpdate] = useState(null); // Store the ID of the transaksi to update
  const [newStatus, setNewStatus] = useState(''); // Store the new status
  const userProfile = useUserProfile(); // Get user profile data
  const [isLoading, setIsLoading] = useState(true); // Loading state to ensure userProfile is ready

  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaGear /> },
    { label: 'Data Transaksi', icon: <GrTransaction /> }, // Item terakhir tanpa link
  ];



  // Fetch transaksi data from backend
  useEffect(() => {
    if (userProfile && userProfile.id) {
      fetchTransaksi();
    }
  }, [userProfile]); // Trigger fetchTransaksi only when userProfile is updated

  async function fetchTransaksi() {
    try {
      setIsLoading(true); // Set loading state to true
      let url = `${import.meta.env.VITE_BASE_URL}/transaksi`;

      // Tambahkan filter berdasarkan peran pengguna
      if (userProfile.role === 'pengepul') {
        url += `?pengepulId=${userProfile.id}`;
      } else if (userProfile.role === 'anggota') {
        url += `?anggotaId=${userProfile.id}`;
      }

      const response = await axios.get(url);
      setTransaksi(response.data.data || []);
    } catch (error) {
      console.error('Error fetching transaksi data:', error);
      alert('Error fetching transaksi data');
    } finally {
      setIsLoading(false); // Set loading state to false
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

  const renderStatus = (status) => {
    switch (status) {
      case 'success':
        return <Badge bg="success"><FaCheckCircle /> Success</Badge>;
      case 'pending':
        return <Badge bg="warning"><FaHourglassHalf /> Pending</Badge>;
      case 'failed':
        return <Badge bg="danger"><FaTimesCircle /> Failed</Badge>;
      case 'cancelled':
        return <Badge bg="secondary"><FaBan /> Cancelled</Badge>;
      default:
        return <Badge bg="light">Unknown</Badge>;
    }
  };

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
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className='text-center'>Data Transaksi</h2>
      <hr/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/transaksi/add" className="mb-3 btn btn-primary align-items-center">
            <FaPlusCircle className="me-2" /> Add New Transaksi
          </Link>

          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>No.</th>
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
                transaksi.map((item,index) => (
                  <tr key={item.id}>
                    {/* <td>{item.id}</td> */}
                    <td>{index + 1}</td>
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
                    <td>{renderStatus(item.statusTransaksi)}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2"> {/* Wrapper dengan Flexbox dan jarak antar tombol */}
                        {/* Tombol View */}
                        <Link to={`/transaksi/view/${item.id}`} className="btn btn-info d-flex align-items-center btn-sm">
                          <FaEye className="me-2" /> View
                        </Link>

                        {/* Tombol Update Status */}
                        <Button
                          variant="warning"
                          onClick={() => handleShowStatusModal(item.id, item.statusTransaksi)}
                          className="d-flex align-items-center"
                          size="sm" // Ukuran tombol kecil
                        >
                          <FaEdit className="me-2" /> Update Status
                        </Button>

                        {/* Tombol Delete */}
                        <Button
                          variant="danger"
                          onClick={() => handleShowDeleteModal(item.id)}
                          className="d-flex align-items-center"
                          size="sm" // Ukuran tombol kecil
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
        </>
      )}
    </div>
  );
}

export default TransaksiData;
