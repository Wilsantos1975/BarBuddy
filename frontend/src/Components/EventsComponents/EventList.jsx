import React from 'react';
import EventsCard from '../EventsComponents/EventsCard';

function EventList({ title, events, onCancelEvent, onDeleteEvent }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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