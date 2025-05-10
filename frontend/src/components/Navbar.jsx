import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <Link to="/" className="text-2xl font-extrabold tracking-wide hover:animate-pulse">Brand</Link>
      <ul className="flex space-x-6 text-lg">
        <li><Link to="/" className="hover:underline hover:text-yellow-300 transition duration-300 transform hover:scale-110">Home</Link></li>
        <li><Link to="/about" className="hover:underline hover:text-yellow-300 transition duration-300 transform hover:scale-110">About</Link></li>
        <li><Link to="/contact" className="hover:underline hover:text-yellow-300 transition duration-300 transform hover:scale-110">Contact</Link></li>
        <li><Link to="/login" className="hover:underline hover:text-yellow-300 transition duration-300 transform hover:scale-110">Login</Link></li>
        <li><Link to="/register" className="hover:underline hover:text-yellow-300 transition duration-300 transform hover:scale-110">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
