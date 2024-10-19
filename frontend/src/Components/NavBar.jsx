import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MyApp</Link>
        <div>
          <Link to="/calculator" className="mx-2">Calculator</Link>
          <Link to="/about" className="mx-2">About the App</Link>
          <Link to="/tutorials" className="mx-2">Tutorials</Link>
          <Link to="/event-wizard" className="mx-2">Event Wizard</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
