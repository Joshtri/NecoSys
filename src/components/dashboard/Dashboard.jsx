import React, { useState, useEffect } from 'react';
import useUserProfile from '../../hooks/useUserProfile';
import StatistikTabs from './Statistik/StatistikTabs';
import { Card, Container, Row, Col, Button, Spinner, Modal } from 'react-bootstrap';
import { FaRecycle, FaChartBar, FaBell } from 'react-icons/fa';
import axios from 'axios';
import ModalTransaksi from './ModalTransaksi';
import { FcRating } from 'react-icons/fc';

function Dashboard() {
  const userProfile = useUserProfile(); // Data userProfile untuk menentukan role dan ID pengguna
  const [totalTransaksi, setTotalTransaksi] = useState(null);
  const [totalSampah, setTotalSampah] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk modal total transaksi
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);

  // State untuk modal notifikasi
  const [showNotifikasiModal, setShowNotifikasiModal] = useState(false);

  // Fetch total transaksi dan sampah
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const pengepulId = userProfile?.id;
        const role = userProfile?.role;

        // Base URL from environment variable
        const baseURL = import.meta.env.VITE_BASE_URL;

        let totalRes;
        let sampahRes;

        if (role === 'admin') {
          // Admin melihat semua transaksi dan sampah
          totalRes = await axios.get(`${baseURL}/transaksi-count`);
          sampahRes = await axios.get(`${baseURL}/sampah/total`);
        } else if (role === 'pengepul' && pengepulId) {
          // Pengepul hanya melihat transaksi dan sampah miliknya
          totalRes = await axios.get(`${baseURL}/transaksi-count/user/${pengepulId}`);
          sampahRes = await axios.get(`${baseURL}/sampah/total/${pengepulId}`);
        }

        console.log('data sampahtotal :',sampahRes);

        setTotalTransaksi(totalRes?.data?.total || 0);
        setTotalSampah(sampahRes?.data?.totalSampah || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userProfile]);

  return (
    <Container fluid className="bg-light py-4">
      <h1 className="text-center text-primary mb-4 fw-bold">Dashboard Eco Bank</h1>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Card className="shadow-sm mb-3">
            <Card.Body className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center mb-2">
                <FaRecycle className="text-success me-3" size={40} />
                <div>
                  <h5 className="fw-bold">Total Transaksi</h5>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <p className="text-muted mb-0">{totalTransaksi} transaksi</p>
                  )}
                </div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowTransaksiModal(true)}
              >
                Lihat Rincian
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="shadow-sm mb-3">
            <Card.Body className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center mb-2">
                <FaChartBar className="text-info me-3" size={40} />
                <div>
                  <h5 className="fw-bold">Sampah Dikelola</h5>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <p className="text-muted mb-0">{totalSampah} kg</p>
                  )}
                </div>
              </div>
              <Button variant="outline-primary" size="sm" disabled>
                Lihat Rincian
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="shadow-sm mb-3">
            <Card.Body className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center mb-2">
                <FcRating className="text-warning me-3" size={40} />
                <div>
                  <h5 className="fw-bold">Rating Pengepul</h5>
                  <p className="text-muted mb-0">Cek rating anda sekarang</p>
                </div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowNotifikasiModal(true)}
              >
                Lihat Rating
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>  

      {/* Tab Statistik */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <StatistikTabs />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Transaksi */}
      <ModalTransaksi
        show={showTransaksiModal}
        onHide={() => setShowTransaksiModal(false)}
        pengepulId={userProfile?.id}
        role={userProfile?.role}
      />

      {/* Modal Notifikasi */}
      <Modal show={showNotifikasiModal} onHide={() => setShowNotifikasiModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rincian Notifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Anda memiliki 3 permintaan baru yang perlu ditinjau.</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Dashboard;
