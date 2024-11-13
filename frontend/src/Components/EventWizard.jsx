import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ConfirmModal from './EventsComponents/ConfirmModal';

function EventWizard() {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    theme: '',
    organizer_id: 1,
    invitee_count: '',
  });
  const [error, setError] = useState(null);
  
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [createdEventData, setCreatedEventData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!event.name || !event.date || !event.time || !event.location || !event.invitee_count) {
        throw new Error('Please fill in all required fields');
      }

      const eventData = {
        ...event,
        invitee_count: parseInt(event.invitee_count),
      };

      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const createdEvent = await response.json();
      setCreatedEventData(createdEvent);
      setError(null);
      setShowConfirmModal(true);
      setCreatedEventData(createdEvent);
      setError(null);
      setShowConfirmModal(true);
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-bb-beige">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-bb-dark">Create New Event</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <p>Please check your input and try again.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md border border-[#C1AC9A]">
          <div className="space-y-4">
            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Event Name</label>
              <input
                type="text"
                value={event.name}
                onChange={handleChange}
                name="name"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Date</label>
              <input
                type="date"
                value={event.date}
                onChange={handleChange}
                name="date"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Time</label>
              <input
                type="time"
                value={event.time}
                onChange={handleChange}
                name="time"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Location</label>
              <input
                type="text"
                value={event.location}
                onChange={handleChange}
                name="location"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Theme</label>
              <input
                type="text"
                value={event.theme}
                onChange={handleChange}
                name="theme"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[#1E1C1A] mb-2 font-medium">Number of Guests</label>
              <input
                type="number"
                value={event.invitee_count}
                onChange={handleChange}
                name="invitee_count"
                min="1"
                className="w-full p-3 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#51657D] text-[#EBDFC7] p-4 rounded-lg hover:bg-[#51657D]/90 transition-colors font-medium"
          >
            Create Event
          </button>
        </form>

      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            navigate('/');
          }}
          message={
            <div className="mb-6">
              <p className="text-[#1E1C1A] mb-2">Event Details:</p>
              <ul className="text-[#51657D] space-y-2">
                <li><strong>Name:</strong> {createdEventData?.name}</li>
                <li><strong>Date:</strong> {new Date(createdEventData?.date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> {createdEventData?.time}</li>
                <li><strong>Location:</strong> {createdEventData?.location}</li>
                <li><strong>Guests:</strong> {createdEventData?.invitee_count}</li>
                {createdEventData?.theme && <li><strong>Theme:</strong> {createdEventData.theme}</li>}
              </ul>
            </div>
          }
        />
      )}
    </div>
    </div>
  );
}

export default EventWizard;
