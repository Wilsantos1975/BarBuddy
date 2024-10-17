import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import CocktailOfTheWeek from './CocktailOfTheWeek';
import EventList from './EventsComponents/EventList';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch('/api/events/user/1'); // Replace '1' with actual user ID
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date() && event.status !== 'cancelled');
  const cancelledEvents = events.filter(event => event.status === 'cancelled');

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
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <EventList title="Upcoming Events" events={upcomingEvents} />
            <EventList title="Cancelled Events" events={cancelledEvents} />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
