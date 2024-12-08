import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setData((prevData) => ({ ...prevData, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/pengguna/login`;
      const payload = {
        email: data.email,
        kataSandi: data.password, // Ubah key dari 'password' menjadi 'kataSandi'
      };

      const response = await axios.post(url, payload);
      const res = response.data;

      // Simpan token dan informasi user ke localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role); // Simpan role pengguna
      localStorage.setItem('nama', res.user.nama); // Simpan nama pengguna

      toast.success('Login berhasil!');
      setTimeout(() => {
        if (res.user.role === 'pengepul') {
          navigate('/dashboard'); // Halaman dashboard pengepul
        } else if (res.user.role === 'admin') {
          navigate('/dashboard'); // Halaman dashboard admin
        } else {
          navigate('/'); // Halaman default
        }
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.error || 'Terjadi kesalahan pada server.'
      );
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="w-100 shadow-lg" style={{ maxWidth: '900px' }}>
        {/* Left Side: Welcome Section */}
        <Col
          xs={12}
          md={6}
          className="bg-success text-white p-5 d-flex flex-column justify-content-center align-items-center rounded-start"
        >
          <h2 className="mb-3 fw-bold">Selamat Datang di NatureCare Eco!</h2>
          <p className="text-center">
            Bergabunglah bersama kami di <strong>NatureCare Eco</strong> untuk menciptakan lingkungan yang lebih bersih, berkelanjutan, dan ramah lingkungan.
          </p>
          <p className="text-center fw-bold">
            🌱 NatureCare Eco: <br />
            Solusi digital untuk masa depan yang hijau.
          </p>
        </Col>

        {/* Right Side: Login Form */}
        <Col xs={12} md={6} className="bg-white p-5 rounded-end">
          <h2 className="text-center mb-4 fw-bold">Masuk ke Akun Anda</h2>
          <p className="text-center text-muted mb-4">
            Kami senang melihat Anda kembali bersama kami di <strong>NatureCare Eco</strong> untuk mewujudkan perubahan lingkungan yang lebih baik.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Email Input */}
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email Anda"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password Anda"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Error Message */}
            {error && <div className="text-danger mb-3">{error}</div>}

            {/* Remember Me */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                id="remember"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-100 mb-3" variant="success">
              Masuk
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
