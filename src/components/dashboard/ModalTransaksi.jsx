import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';

function ModalTransaksi({ show, onHide, userId, role }) {
  const [statusCounts, setStatusCounts] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchTransaksiData = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const statuses = ['pending', 'success', 'failed', 'cancelled'];
  
        console.log("Fetching status counts...");
  
        // Fetch counts for each status
        const statusPromises = statuses.map((status) => {
          if (role === 'admin') {
            return axios.get(`${baseURL}/transaksi-count/${status}`);
          } else if (role === 'pengepul' && userId) {
            return axios.get(`${baseURL}/transaksi-count/user/${userId}/status/${status}`);
          }
          return Promise.resolve({ data: { total: 0 } });
        });
  
        const statusResults = await Promise.all(statusPromises);
        console.log("Status counts results:", statusResults);
  
        const counts = {};
        statusResults.forEach((result, index) => {
          counts[statuses[index]] = result.data.total;
        });
        console.log("Processed status counts:", counts);
        setStatusCounts(counts);
  
        // Fetch transactions
        console.log("Fetching transactions...");
        const transactionsRes = await axios.get(`${baseURL}/transaksi`, {
          params: { userId, role, status: selectedStatus !== 'all' ? selectedStatus : undefined },
        });
  
        console.log("Transactions data:", transactionsRes.data);
        setTransactions(transactionsRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setLoading(false);
      }
    };
  
    if (show) {
      fetchTransaksiData();
    }
  }, [show, userId, role, selectedStatus]);
  

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
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
          <>
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

            <Table bordered hover>
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Status</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.status}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Tidak ada transaksi untuk status ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalTransaksi;
