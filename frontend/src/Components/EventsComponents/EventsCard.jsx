import React from 'react';

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
      <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600">Time: {event.time}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-600">Status: {event.status}</p>
    </div>
  );
}

export default EventCard;
