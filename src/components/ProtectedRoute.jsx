import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage'; // Import halaman 404

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Dapatkan role dari localStorage

  // Jika user belum login, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Jika role tidak diizinkan, tampilkan halaman 404
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <NotFoundPage />;
  }

  // Jika user login dan peran diizinkan, tampilkan komponen yang diminta
  return <Component />;
};

// Menambahkan propTypes untuk validasi
ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
