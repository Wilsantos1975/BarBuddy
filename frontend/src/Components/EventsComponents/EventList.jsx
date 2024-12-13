import React from 'react';
import EventsCard from './EventsCard';

function EventList({ title, events, onCancelEvent, onDeleteEvent }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-fascinate text-white mb-6">{title}</h2>
      <div className="card-grid">
        {events.map((event) => (
          <EventsCard
            key={event.id}
            event={event}
            onCancelEvent={onCancelEvent}
            onDeleteEvent={onDeleteEvent}
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;