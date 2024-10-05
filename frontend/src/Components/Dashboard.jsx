import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import CocktailOfTheWeek from './CocktailOfTheWeek';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, User!</h1>
            <CocktailOfTheWeek />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/event-wizard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300"
          >
            Event Wizard
          </Link>
          <Link
            to="/batch-calculator"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300"
          >
            Batch Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
