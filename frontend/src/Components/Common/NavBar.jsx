import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-[#1E1C1A] text-[#EBDFC7] px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* User Profile - Left Side */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#51657D] flex items-center justify-center shadow-md">
            👤
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#EBDFC7]">User Name</p>
            <Link 
              to="/profile" 
              className="text-xs text-[#C1AC9A] hover:text-[#EBDFC7] transition-colors duration-200"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Navigation Links - Center */}
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-[#EBDFC7] hover:text-[#C1AC9A] transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-[#EBDFC7] hover:text-[#C1AC9A] transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-[#EBDFC7] hover:text-[#C1AC9A] transition-colors"
          >
            Contact
          </Link>
          <Link 
            to="/login" 
            className="text-[#EBDFC7] hover:text-[#C1AC9A] transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-[#EBDFC7] hover:text-[#C1AC9A] transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Right section - can be used for additional features */}
        <div className="flex items-center space-x-4">
          {/* Add any right-aligned items here if needed */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;