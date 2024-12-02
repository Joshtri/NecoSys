import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSymbol
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi password sebelum login
    if (!validatePassword(data.password)) {
      setError('Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol.');
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/auth`;
      const response = await axios.post(url, data);
      console.log('Full API response:', response);

      const res = response.data;

      // Simpan token dan informasi user ke localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('firstName', res.user.firstName);
      localStorage.setItem('lastName', res.user.lastName);
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('id', res.user.id);

      toast.success('Login berhasil!');
      setTimeout(() => {
        navigate('/my/author/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error occurred:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Container fluid className="h-100 d-flex justify-content-center align-items-center bg-light">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="w-100">
        {/* Left Side: Image or Welcome Message */}
        <Col xs={12} md={6} className="bg-primary text-white p-4 d-flex flex-column justify-content-center align-items-center">
          {/* Uncomment logo if needed */}
          {/* <img src={logoYayasan} alt="Logo Yayasan" className="mb-4 w-40 h-40 object-contain" /> */}
          <h2 className="mb-2 font-weight-bold">Selamat Datang</h2>
          <p className="text-center">Silakan masuk untuk melanjutkan dan menikmati layanan kami.</p>
        </Col>

        {/* Right Side: Login Form */}
        <Col xs={12} md={6} className="bg-white p-5">
          <h2 className="text-center mb-4">Salam hangat kembali!</h2>
          <p className="text-center text-muted">Kami sangat senang Anda kembali bersama kami.</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <div className="text-danger mt-2">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Form.Check type="checkbox" id="remember" label="Remember Me" />
              <Link to="/forgot-password" className="text-sm text-primary">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
