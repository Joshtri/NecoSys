import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Image } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <Container className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <p className="fs-4 text-secondary">Oops! Halaman yang Anda cari tidak ditemukan.</p>
        <Image
          src="https://flowbite.com/docs/images/illustrations/404.svg"
          alt="Error illustration"
          fluid
          className="my-4"
          style={{ maxWidth: '400px' }}
        />
        <div>
          <Link to="/">
            <Button variant="primary" className="px-4 py-2">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
