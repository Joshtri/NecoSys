import React, { useState, useEffect } from 'react';
import useUserProfile from '../../hooks/useUserProfile';
import StatistikTabs from './Statistik/StatistikTabs';
import { Card, Container, Row, Col, Button, Spinner, Modal } from 'react-bootstrap';
import { FaRecycle, FaChartBar } from 'react-icons/fa';
import { FcRating } from 'react-icons/fc';
import axios from 'axios';
import Calendar from 'react-calendar'; // Import kalender
import 'react-calendar/dist/Calendar.css'; // Import style default react-calendar
import ModalTransaksi from './ModalTransaksi';

function Dashboard() {
  const userProfile = useUserProfile(); // Data userProfile untuk menentukan role dan ID pengguna
  const [totalTransaksi, setTotalTransaksi] = useState(null);
  const [totalSampah, setTotalSampah] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk modal total transaksi
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  // State untuk modal notifikasi / rating
  const [showNotifikasiModal, setShowNotifikasiModal] = useState(false);

  // State untuk kalender
  const [date, setDate] = useState(new Date());

  // Fetch total transaksi dan sampah
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const pengepulId = userProfile?.id;
        const role = userProfile?.role;
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
          sampahRes = await axios.get(`${baseURL}/sampah/total/pengepul/${pengepulId}`);
        }

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
    <Container fluid className="py-4">
      <h1 className="text-center mb-4 fw-bold" style={{ color: '#008404' }}>Dashboard NatureCare</h1>

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
                <FcRating className="me-3" size={40} />
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

      {/* Kalender dan Statistik dalam Satu Baris */}
      <Row className="mb-4">
        <Col md={6} sm={12}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold text-center mb-3">Kalender Aktivitas</h5>
              <Calendar
                onChange={setDate}
                value={date}
                className="mx-auto"
              />
              <p className="text-center mt-3">
                <strong>Tanggal yang dipilih:</strong> {date.toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold text-center mb-3">Statistik</h5>
              <StatistikTabs />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal untuk transaksi */}
      {/* Modal Transaksi */}
      <ModalTransaksi
        show={showTransaksiModal}
        onHide={() => setShowTransaksiModal(false)}
        pengepulId={userProfile?.id}
        role={userProfile?.role}
      />

      {/* Modal untuk Rating / Notifikasi */}
      <Modal show={showNotifikasiModal} onHide={() => setShowNotifikasiModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating Pengepul</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Konten Rating dapat ditambahkan di sini */}
          <p>Rating Anda ...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotifikasiModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
