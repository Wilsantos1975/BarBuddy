import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-red-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">MyApp</Link>
        <ul className="flex space-x-4">
          <li><Link to="/batch-calculator" className="text-white hover:text-gray-300">Calculator</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-300">About the App</Link></li>
          <li><Link to="/tutorials" className="text-white hover:text-gray-300">Tutorials</Link></li>
          <li><Link to="/event-wizard" className="text-white hover:text-gray-300">Event Wizard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;