import React from 'react';

function EventList({ title, events, onCancelEvent, onDeleteEvent }) {
  if (!events || events.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#1E1C1A]">{title}</h2>
        <p className="text-[#51657D]">No events to display.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#1E1C1A] border-b-2 border-[#51657D] pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md p-6 border border-[#C1AC9A] hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#1E1C1A]">{event.name}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-[#51657D]">
                <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-[#51657D]">
                <span className="font-medium">Time:</span> {event.time}
              </p>
              <p className="text-[#51657D]">
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <p className="text-[#51657D]">
                <span className="font-medium">Guests:</span> {event.invitee_count}
              </p>
              {event.theme && (
                <p className="text-[#51657D]">
                  <span className="font-medium">Theme:</span> {event.theme}
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-[#C1AC9A]">
              {event.status !== 'cancelled' && (
                <button
                  onClick={() => onCancelEvent(event.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => onDeleteEvent(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;