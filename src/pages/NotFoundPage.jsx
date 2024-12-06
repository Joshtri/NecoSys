import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Image } from 'react-bootstrap';

const NotFoundPage = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <Container className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <p className="fs-4 text-secondary">Oops! Halaman yang Anda cari tidak ditemukan.</p>
        <Image
          src="https://bank-sampah-app-client.vercel.app/assets/3737258-Uin_m2QF.png"
          alt="Error illustration"
          fluid
          className="my-4"
          style={{ maxWidth: '400px' }}
        />
        <div>
          <Button variant="primary" className="px-4 py-2" onClick={handleGoBack}>
            Kembali
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
