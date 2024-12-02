import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Collapse } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icon for mobile menu

function CustomNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  return (
    <Navbar expand="lg" className="shadow-md bg-white w-full">
      <div className="container-fluid d-flex justify-content-between py-3 px-4">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="navbar-brand text-xl font-semibold text-blue-600 hover:text-blue-800"
        >
          SI | Pengolahan Bank Sampah
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          className="d-lg-none text-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </Button>

        {/* Center: Navigation Links (Desktop) */}
        <Navbar.Collapse className="justify-content-end">
          <Nav className="d-none d-lg-flex">
            {/* Main Dashboard Link */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold nav-link'
                  : 'text-gray-600 hover:text-blue-500 nav-link'
              }
            >
              Dashboard
            </NavLink>

            {/* Admin Data Dropdown */}
            <NavDropdown title="Admin Data" id="admin-data-dropdown">
              {/* Pengguna Management */}
              <NavDropdown.Item as={Link} to="/admin/pengguna">
                Pengguna
              </NavDropdown.Item>
              {/* Anggota Management */}
              <NavDropdown.Item as={Link} to="/admin/anggota">
                Anggota
              </NavDropdown.Item>
              {/* Kategori Sampah Management */}
              <NavDropdown.Item as={Link} to="/admin/kategori-sampah">
                Kategori Sampah
              </NavDropdown.Item>
              {/* Item Sampah Management */}
              <NavDropdown.Item as={Link} to="/admin/item-sampah">
                Item Sampah
              </NavDropdown.Item>
              {/* Transaksi Management */}
              <NavDropdown.Item as={Link} to="/admin/transaksi">
                Transaksi
              </NavDropdown.Item>
            </NavDropdown>

            {/* User Dropdown */}
            <NavDropdown title="John Doe" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>

      {/* Mobile Menu */}
      <Collapse in={isMobileMenuOpen}>
        <div className="d-lg-none flex flex-column px-6 py-4 bg-white border-top">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-semibold w-100'
                : 'text-gray-600 hover:text-blue-500 w-100'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          {/* Admin Data Menu for Mobile */}
          <NavDropdown title="Admin Data" className="w-100">
            <NavLink
              to="/admin/pengguna"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold w-100'
                  : 'text-gray-600 hover:text-blue-500 w-100'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pengguna
            </NavLink>

            <NavLink
              to="/admin/anggota"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold w-100'
                  : 'text-gray-600 hover:text-blue-500 w-100'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Anggota
            </NavLink>

            <NavLink
              to="/admin/kategori-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold w-100'
                  : 'text-gray-600 hover:text-blue-500 w-100'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kategori Sampah
            </NavLink>

            <NavLink
              to="/admin/item-sampah"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold w-100'
                  : 'text-gray-600 hover:text-blue-500 w-100'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Item Sampah
            </NavLink>

            <NavLink
              to="/admin/transaksi"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-700 font-semibold w-100'
                  : 'text-gray-600 hover:text-blue-500 w-100'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Transaksi
            </NavLink>
          </NavDropdown>

          {/* User Profile & Logout (Dummy Content for UI) */}
          <button className="text-gray-600 hover:text-blue-500 w-100 text-left">
            Profile
          </button>
          <button className="text-gray-600 hover:text-red-500 w-100 text-left">
            Logout
          </button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
