import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-5 border-t border-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get In Touch</h3>
            <p className="text-gray-500 text-sm mb-4">ABES Engineering College</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <Facebook size={25} />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <Instagram size={25} />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <Twitter size={25} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Info</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Carrier</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">We are hiring</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Business Marketing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">User Analytic</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Live Chat</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Unlimited Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">iOS & Android</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Watch a Demo</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Customers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">API</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Made with Love by ASMR</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;