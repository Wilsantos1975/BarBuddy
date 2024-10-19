import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">BarBuddy</h2>
      <nav>
        <ul>
          <li><Link to="/" className="block py-2">Dashboard</Link></li>
          <li><Link to="/batch-calculator" className="block py-2">Batch Calculator</Link></li>
          <li><Link to="/event-wizard" className="block py-2">Event Wizard</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
