import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breadcrumbs.css'; // Tambahkan CSS untuk styling, opsional

const Breadcrumbs = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.map((path, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`}
          >
            {index === paths.length - 1 ? (
              <span>
                {path.icon && <span className="me-2">{path.icon}</span>}
                {path.label}
              </span>
            ) : (
              <Link to={path.link}>
                {path.icon && <span className="me-2">{path.icon}</span>}
                {path.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Validasi props
Breadcrumbs.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Label teks
      link: PropTypes.string, // Link opsional (tidak perlu untuk item terakhir)
      icon: PropTypes.element, // Ikon dari react-bootstrap
    })
  ).isRequired,
};

export default Breadcrumbs;
