// src/components/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import logoYayasan from '../../assets/logoYayasan.jpg';

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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white w-1/2 p-10">
          {/* <img
            src={logoYayasan}
            alt="Logo Yayasan"
            className="mb-5 w-40 h-40 object-contain"
          /> */}
          <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2>
          <p className="text-center">
            Silakan masuk untuk melanjutkan dan menikmati layanan kami.
          </p>
        </div>

        <div className="bg-white w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Salam hangat kembali!</h2>
            <p className="text-gray-600">Kami sangat senang Anda kembali bersama kami.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" value="Email address" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex items-center justify-between mt-4">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="ml-2">
                Remember Me
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
            </span>
            <Link
              to="/auth/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;