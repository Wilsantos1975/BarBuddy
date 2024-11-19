import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmationModal from './Common/ConfirmationModal';

function EventWizard() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdating = location.state?.isUpdating;
  const existingEvent = location.state?.eventData;

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

  // Add handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  // Populate form if updating
  useEffect(() => {
    if (isUpdating && existingEvent) {
      setEvent({
        ...existingEvent,
        date: existingEvent.date.split('T')[0], // Format date for input
      });
    }
  }, [isUpdating, existingEvent]);

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

      const url = isUpdating 
        ? `http://localhost:3000/events/${event.id}`
        : 'http://localhost:3000/events';

      const response = await fetch(url, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isUpdating ? 'update' : 'create'} event`);
      }

      const responseData = await response.json();
      setCreatedEventData(responseData);
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
        <h1 className="text-3xl font-bold mb-6 text-bb-dark">
          {isUpdating ? 'Update Event' : 'Create New Event'}
        </h1>

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
            {isUpdating ? 'Update Event' : 'Create Event'}
          </button>
        </form>

        <ConfirmationModal
          isOpen={showConfirmModal}
          title={isUpdating ? "Event Updated Successfully!" : "Event Created Successfully!"}
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
          primaryAction={() => {
            setShowConfirmModal(false);
            navigate('/');
          }}
          secondaryAction={() => setShowConfirmModal(false)}
          primaryButtonText="Go to Dashboard"
          secondaryButtonText={isUpdating ? "Make Another Update" : "Create Another Event"}
        />
      </div>
    </div>
  );
}

export default EventWizard;
