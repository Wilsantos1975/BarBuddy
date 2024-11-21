import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-transparent px-6 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo - Left Side */}
        <div className="flex items-center">
          <Link to="/" className="text-[#1B3A4B] text-2xl font-bold">
            BarBuddy
          </Link>
        </div>

        {/* Navigation Links - Center */}
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-[#1B3A4B] hover:text-[#2A9D8F] transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-[#1B3A4B] hover:text-[#2A9D8F] transition-colors"
          >
            Features
          </Link>
        
          <Link 
            to="/about" 
            className="text-[#1B3A4B] hover:text-[#2A9D8F] transition-colors"
          >
            About
          </Link>
        </div>

        {/* Auth Buttons - Right */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="text-[#2A9D8F] hover:text-[#238276] transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-[#2A9D8F] text-white px-4 py-2 rounded-full hover:bg-[#238276] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;