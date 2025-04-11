import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 p-4 text-white shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo / App Name */}
      <h1 className="text-3xl font-semibold">🌍 Country Explorer</h1>
      
      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-all duration-200">Home</Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-gray-300 transition-all duration-200">Search Country</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
