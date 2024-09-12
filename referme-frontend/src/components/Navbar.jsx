// src/components/Navbar.jsx (or similar)
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    {/* Other Links */}
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

export default Navbar;
