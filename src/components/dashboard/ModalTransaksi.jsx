import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaBan } from 'react-icons/fa';

function ModalTransaksi({ show, onHide, pengepulId, role }) {
  const [statusCounts, setStatusCounts] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchTransaksiData = async () => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_BASE_URL;
  
      // Log untuk memastikan selectedStatus
      console.log('Fetching transactions for status:', selectedStatus);
  
      // Fetch transactions berdasarkan statusTransaksi
      const transactionsRes = await axios.get(`${baseURL}/transaksi-status`, {
        params: {
          role,
          pengepulId: role === 'pengepul' ? pengepulId : undefined,
          statusTransaksi: selectedStatus !== 'all' ? selectedStatus : undefined,
        },
      });
  
      // Log data transaksi yang diterima
      console.log('Transactions fetched:', transactionsRes.data.data);
      setTransactions(transactionsRes.data.data || []);
  
      // Fetch counts untuk setiap statusTransaksi
      const statuses = ['pending', 'success', 'failed', 'cancelled'];
      const statusCountsPromises = statuses.map((status) => {
        const endpoint = role === 'pengepul'
          ? `${baseURL}/transaksi-count/user/${pengepulId || 'all'}/status/${status}`
          : `${baseURL}/transaksi-count/${status}`;
      
        const params = role === 'pengepul'
          ? { role, pengepulId }
          : { role };
      
        return axios
          .get(endpoint, { params })
          .then((res) => ({ status, count: res.data.total }))
          .catch((error) => {
            console.error(`Error fetching count for status ${status}:`, error);
            return { status, count: 0 };
          });
      });
      
  
      const counts = await Promise.all(statusCountsPromises);
      const countsObject = counts.reduce((acc, { status, count }) => {
        acc[status] = count;
        return acc;
      }, {});
  
      // Log statistik transaksi
      console.log('Status counts fetched:', countsObject);
      setStatusCounts(countsObject);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      setLoading(false);
    }
  };
  
  

  // Fetch data saat `show` atau `selectedStatus` berubah
  useEffect(() => {
    if (show) {
      fetchTransaksiData();
    }
  }, [show, selectedStatus]);

  const renderStatus = (status) => {
    switch (status) {
      case 'success':
        return (
          <span className="text-success">
            <FaCheckCircle /> Berhasil
          </span>
        );
      case 'pending':
        return (
          <span className="text-warning">
            <FaHourglassHalf /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="text-danger">
            <FaTimesCircle /> Gagal
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-secondary">
            <FaBan /> Dibatalkan
          </span>
        );
      default:
        return status;
    }
  };

  return (
<Modal show={show} onHide={onHide} centered size="xl">
  <Modal.Header closeButton>
    <Modal.Title>Rincian Total Transaksi</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {loading ? (
      <div className="text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading data...</p>
      </div>
    ) : (
      <div>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Statistik Transaksi</h5>
            <ul className="list-unstyled">
              <li>Pending: {statusCounts.pending || 0} transaksi</li>
              <li>Success: {statusCounts.success || 0} transaksi</li>
              <li>Failed: {statusCounts.failed || 0} transaksi</li>
              <li>Cancelled: {statusCounts.cancelled || 0} transaksi</li>
            </ul>
            <div className="mt-3">
              {['all', 'pending', 'success', 'failed', 'cancelled'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'primary' : 'outline-primary'}
                  size="sm"
                  className="me-2"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status === 'all' ? 'Tampilkan Semua' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        <div className="table-responsive">
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Status</th>
                <th>Total Transaksi</th>
                <th>Tanggal Transaksi</th>
                <th>Nama Anggota</th>
                <th>Nama Pengepul</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{renderStatus(transaction.statusTransaksi)}</td>
                    <td>Rp. {transaction.totalTransaksi.toLocaleString('id-ID')}</td>
                    <td>{new Date(transaction.tanggalTransaksi).toLocaleDateString()}</td>
                    <td>{transaction.anggota?.nama || 'Tidak diketahui'}</td>
                    <td>{transaction.pengepul?.namaBankSampah || 'Tidak diketahui'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada transaksi untuk status ini.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Modal.Body>
</Modal>

  );
}

export default ModalTransaksi;
