import React from 'react';
import EventCard from "./EventsCard"

function EventList({ title, events }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
        <p>No events to display.</p>
      )}
    </div>
  );
}

export default EventList;