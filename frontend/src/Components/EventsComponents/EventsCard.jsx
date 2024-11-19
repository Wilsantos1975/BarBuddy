import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Common/ConfirmationModal';

function EventsCard({ event, onCancelEvent, onDeleteEvent }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleUpdateEvent = () => {
    navigate('/event-wizard', { 
      state: { 
        isUpdating: true,
        eventData: event 
      }
    });
  };

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleConfirm = () => {
    if (modalAction === 'cancel' && typeof onCancelEvent === 'function') {
      onCancelEvent(event.id);
    } else if (modalAction === 'delete' && typeof onDeleteEvent === 'function') {
      onDeleteEvent(event.id);
    } else {
      console.error(`${modalAction} handler is not a function`);
    }
    closeModal();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
      <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600">Time: {event.time}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-600">Theme: {event.theme}</p>
      <p className="text-gray-600">Status: {event.status}</p>
      
      <div className="flex gap-2 mt-4">
        {event.status !== 'cancelled' && (
          <>
            <button 
              onClick={handleUpdateEvent}
              className="bg-[#51657D] text-white px-4 py-2 rounded hover:bg-[#51657D]/90"
            >
              Update Event
            </button>
            <button 
              onClick={() => openModal('cancel')}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Event
            </button>
          </>
        )}
        {event.status === 'cancelled' && (
          <button 
            onClick={() => openModal('delete')}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Delete Event
          </button>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={modalAction === 'cancel' ? 'Cancel Event' : 'Delete Event'}
        message={modalAction === 'cancel' 
          ? 'Are you sure you want to cancel this event?' 
          : 'Are you sure you want to delete this event? This action cannot be undone.'}
        primaryAction={handleConfirm}
        secondaryAction={closeModal}
        primaryButtonText={modalAction === 'cancel' ? 'Cancel Event' : 'Delete Event'}
        secondaryButtonText="Go Back"
      />
    
    </div>
  );
}

export default EventsCard;
