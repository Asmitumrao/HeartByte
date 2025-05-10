import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../src/assets/logo.png'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-5 pt-8 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Links Section */}
        <div className="flex items-center space-x-6 text-lg">
          <Link to="/" className="font-semibold text-gray-800">Home</Link>
          <Link to="/about" className="font-semibold text-gray-800">About Us</Link>
          <Link to="/contact" className="font-semibold text-gray-800">Contact Us</Link>
        </div>

        {/* Logo Centering */}
        <div className="flex justify-center items-center w-1/3">
          <img src={logo} alt="Logo" className="w-30 h-30" />  {/* Correct way to reference */}
        </div>

        {/* Authentication Links and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-800 text-lg">Log in</Link>
          <Link to="/register" className="bg-red-700 text-white px-8 py-3 hover:bg-blue-500 rounded-md font-medium">Sign In</Link>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;
