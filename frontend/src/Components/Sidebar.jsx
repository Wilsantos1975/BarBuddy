import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">BarBuddy</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/batch-calculator"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Batch Calculator
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/event-wizard' className="block py-2 px-4 rounded hover:bg-gray-700">
              Event Wizard
            </Link>
          </li>
          {/* Add other navigation items as needed */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;