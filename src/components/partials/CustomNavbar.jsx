import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Badge, Collapse } from 'react-bootstrap';
import { FaBars, FaTimes, FaRecycle, FaUserCircle, FaBell } from 'react-icons/fa';
import useUserProfile from '../../hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const userProfile = useUserProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Transaksi baru diterima', type: 'info' },
    { id: 2, message: 'Item sampah berhasil ditambahkan', type: 'success' },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-lg bg-white w-full border-b border-green-200 sticky-top"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center py-3 px-4">
        {/* Left: Brand & Navigation */}
        <div className="d-flex align-items-center">
          <Link
            to="/dashboard"
            className="navbar-brand text-xl font-bold text-green-700 hover:text-green-900 d-flex align-items-center me-4"
          >
            IS |
            <FaRecycle size={24} className="me-2 ms-2" />
            {userProfile.role === 'pengepul' ? userProfile.namaBankSampah || 'Bank Sampah' : '| Nature ECO'}
          </Link>

          {/* Desktop Navigation Links */}
          <Nav className="d-none d-lg-flex">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'bg-success text-white px-3 py-2 rounded nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/kategori-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'bg-success text-white px-3 py-2 rounded nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Kategori Sampah
            </NavLink>
            <NavLink
              to="/item-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'bg-success text-white px-3 py-2 rounded nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Item Sampah
            </NavLink>
            <NavLink
              to="/transaksi"
              className={({ isActive }) =>
                isActive
                  ? 'bg-success text-white px-3 py-2 rounded nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Transaksi
            </NavLink>

            {userProfile.role === 'admin' && (
              <NavDropdown title="Admin Data" id="admin-data-dropdown" className="text-gray-600">
                <NavDropdown.Item as={Link} to="/admin/pengguna">
                  Pengguna
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/pengepul">
                  Pengepul
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/anggota">
                  Anggota
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="d-flex align-items-center">
          {/* Notifications */}
          <NavDropdown
            title={
              <div className="position-relative">
                <FaBell size={22} className="text-green-700" />
                {notifications.length > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {notifications.length}
                  </Badge>
                )}
              </div>
            }
            id="notification-dropdown"
            align="end"
          >
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <NavDropdown.Item key={notif.id}>{notif.message}</NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item>Tidak ada notifikasi</NavDropdown.Item>
            )}
          </NavDropdown>

          {/* User Dropdown */}
          <NavDropdown
            title={<FaUserCircle size={22} className="text-green-700 ms-3" />}
            id="user-nav-dropdown"
            align="end"
          >
            <NavDropdown.Item as={Link} to="/my-profile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>

          {/* Mobile Menu Toggle */}
          <Button
            className="d-lg-none text-green-700 ms-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Collapse in={isMobileMenuOpen}>
        <div className="d-lg-none flex flex-column px-6 py-4 bg-green-50 border-top border-green-200">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'bg-success text-white rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/kategori-sampah"
            className={({ isActive }) =>
              isActive
                ? 'bg-success text-white rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kategori Sampah
          </NavLink>
          <NavLink
            to="/item-sampah"
            className={({ isActive }) =>
              isActive
                ? 'bg-success text-white rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Item Sampah
          </NavLink>
          <NavLink
            to="/transaksi"
            className={({ isActive }) =>
              isActive
                ? 'bg-success text-white rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Transaksi
          </NavLink>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
