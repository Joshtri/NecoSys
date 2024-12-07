import React, { useState } from 'react';
import useUserProfile from '../../hooks/useUserProfile';
import StatistikTabs from './Statistik/StatistikTabs';
import ModalRincian from '../dashboard/ModalRincian'; // Import ModalRincian
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaRecycle, FaChartBar, FaBell } from 'react-icons/fa';

function Dashboard() {
  const userProfile = useUserProfile();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleShowModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

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
                  <p className="text-muted mb-0">25 transaksi</p>
                </div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleShowModal(
                  'Rincian Total Transaksi',
                  <ul>
                    <li>Transaksi 1: 10kg sampah plastik</li>
                    <li>Transaksi 2: 5kg sampah kertas</li>
                    <li>Transaksi 3: 10kg sampah kaca</li>
                  </ul>
                )}
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
                  <p className="text-muted mb-0">150 kg</p>
                </div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleShowModal(
                  'Rincian Sampah Dikelola',
                  <ul>
                    <li>Plastik: 50kg</li>
                    <li>Kertas: 30kg</li>
                    <li>Logam: 20kg</li>
                    <li>Kaca: 10kg</li>
                    <li>Organik: 40kg</li>
                  </ul>
                )}
              >
                Lihat Rincian
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="shadow-sm mb-3">
            <Card.Body className="d-flex align-items-center">
              <FaBell className="text-warning me-3" size={40} />
              <div>
                <h5 className="fw-bold">Notifikasi Baru</h5>
                <p className="text-muted mb-0">3 permintaan</p>
              </div>
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

      {/* Notifikasi */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold text-primary mb-3">Notifikasi</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <FaBell className="text-warning me-2" />
                  Pemohon baru untuk menyetor sampah: <strong>3 permintaan</strong>.
                </li>
                <li>
                  <FaBell className="text-warning me-2" />
                  Pengingat: Kirim laporan bulanan sebelum tanggal <strong>30</strong>.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Component */}
      <ModalRincian
        show={showModal}
        onHide={handleHideModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </Container>
  );
}

export default Dashboard;
