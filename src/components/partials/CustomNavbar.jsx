import { NavLink, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Dropdown, Navbar as FlowbiteNavbar, Button } from 'flowbite-react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icon for mobile menu

function CustomNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const mobileMenuRef = useRef(null); // Ref for handling outside clicks

  return (
    <FlowbiteNavbar className="shadow-md bg-white w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="text-xl font-semibold text-blue-600 hover:text-blue-800"
        >
          SI | Pengolahan Bank Sampah
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Button
            className="text-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />} {/* Larger icon */}
          </Button>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/posted-article"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }
          >
            Posting Artikel
          </NavLink>

          {/* User Dropdown (Dummy Content for UI) */}
          <Dropdown label="John Doe" inline={true} arrowIcon={false}>
            <Dropdown.Item>My Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden flex flex-col items-start space-y-4 px-6 py-6 bg-white border-t"
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-semibold w-full'
                : 'text-gray-600 hover:text-blue-500 w-full'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/posted-article"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-700 font-semibold w-full'
                : 'text-gray-600 hover:text-blue-500 w-full'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Daftar Sampah
          </NavLink>

          {/* User Profile & Logout (Dummy Content for UI) */}
          <button
            className="text-gray-600 hover:text-blue-500 w-full text-left"
          >
            Profile
          </button>
          <button
            className="text-gray-600 hover:text-red-500 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </FlowbiteNavbar>
  );
}

export default CustomNavbar;
