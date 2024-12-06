import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Collapse } from 'react-bootstrap';
import { FaBars, FaTimes, FaRecycle, FaUserCircle } from 'react-icons/fa'; // Icon tematik
import useUserProfile from '../../hooks/useUserProfile'; // Import custom hook
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const userProfile = useUserProfile(); // Get user profile data
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    navigate('/'); // Redirect ke halaman login
  };

  return (
    <Navbar expand="lg" className="shadow-md bg-white w-full border-b border-green-200">
      <div className="container-fluid d-flex justify-content-between py-3 px-4">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="navbar-brand text-xl font-bold text-green-700 hover:text-green-900 d-flex align-items-center"
        >
          SI |
          <FaRecycle size={24} className="me-2 ms-2" />
          {userProfile.role === 'pengepul' ? userProfile.namaBankSampah || 'Bank Sampah' : 'SI | ECO Bank'}
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          className="d-lg-none text-green-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </Button>

        {/* Center: Navigation Links (Desktop) */}
        <Navbar.Collapse className="justify-content-end">
          <Nav className="d-none d-lg-flex">
            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-800 bg-green-100 rounded px-3 py-2 font-semibold nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Dashboard
            </NavLink>

            {/* Shared Features (Kategori Sampah, Item Sampah, Transaksi) */}
            <NavLink
              to="/kategori-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-800 bg-green-100 rounded px-3 py-2 font-semibold nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Kategori Sampah
            </NavLink>
            <NavLink
              to="/item-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-800 bg-green-100 rounded px-3 py-2 font-semibold nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Item Sampah
            </NavLink>
            <NavLink
              to="/transaksi"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-800 bg-green-100 rounded px-3 py-2 font-semibold nav-link'
                  : 'text-gray-600 hover:text-green-600 px-3 py-2 nav-link'
              }
            >
              Transaksi
            </NavLink>

            {/* Fitur Admin Data (Hanya Admin) */}
            {userProfile.role === 'admin' && (
              <NavDropdown title="Admin Data" id="admin-data-dropdown" className="text-gray-600">
                <NavDropdown.Item as={Link} to="/admin/pengguna">
                  Pengguna
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/anggota">
                  Anggota
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* User Dropdown */}
            <NavDropdown
              title={<FaUserCircle size={20} className="text-green-700" />}
              id="user-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>

      {/* Mobile Menu */}
      <Collapse in={isMobileMenuOpen}>
        <div className="d-lg-none flex flex-column px-6 py-4 bg-green-50 border-top border-green-200">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          {/* Shared Features for Both Admin and Pengepul */}
          <NavLink
            to="/admin/kategori-sampah"
            className={({ isActive }) =>
              isActive
                ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kategori Sampah
          </NavLink>
          <NavLink
            to="/admin/item-sampah"
            className={({ isActive }) =>
              isActive
                ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Item Sampah
          </NavLink>
          <NavLink
            to="/admin/transaksi"
            className={({ isActive }) =>
              isActive
                ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Transaksi
          </NavLink>

          {/* Fitur Admin Data (Hanya Admin) */}
          {userProfile.role === 'admin' && (
            <NavDropdown title="Admin Data" className="w-100 text-gray-600">
              <NavLink
                to="/admin/pengguna"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                    : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pengguna
              </NavLink>
              <NavLink
                to="/admin/anggota"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-800 bg-green-100 rounded w-100 px-3 py-2'
                    : 'text-gray-600 hover:text-green-600 w-100 px-3 py-2'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anggota
              </NavLink>
            </NavDropdown>
          )}

          {/* Profile & Logout */}
          <button className="text-gray-600 hover:text-green-700 w-100 text-left mt-2">
            Profile
          </button>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
