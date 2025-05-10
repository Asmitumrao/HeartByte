import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../public/assets/logo.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-5 pt-8 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6 text-lg">
          <Link to="/" className="font-semibold text-gray-800">Home</Link>
          <Link to="/about" className="font-semibold text-gray-800">About Us</Link>
          <Link to="/contact" className="font-semibold text-gray-800">Contact Us</Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 py-4">
          <div className="relative w-30 h-30">
            <div className="absolute p-2 w-full h-full">
              <img src={logo} />
            </div>
          </div>
        </div>


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

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white p-4 shadow-lg rounded-lg">
          <Link to="/" className="block py-2 font-medium text-gray-800">Home</Link>
          <Link to="/about" className="block py-2 font-medium text-gray-800">About Us</Link>
          <Link to="/contact" className="block py-2 font-medium text-gray-800">Contact Us</Link>
          <div className="border-t border-gray-200 my-2"></div>
          <Link to="/login" className="block py-2 font-medium text-gray-800">Log in</Link>
          <Link to="/register" className="block py-2 font-medium text-white bg-red-600 rounded text-center mt-2">Sign</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;