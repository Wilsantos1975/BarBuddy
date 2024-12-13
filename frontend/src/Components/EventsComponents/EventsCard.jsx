import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Common/ConfirmationModal';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

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
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <div className="space-y-3">
        <div className="space-y-2">
          <p className="text-forest text-xl">
            <span className="font-fascinate">Date: </span>
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-forest text-xl">
            <span className="font-fascinate">Time: </span>
            {event.time}
          </p>
          <p className="text-forest text-xl">
            <span className="font-fascinate">Location: </span>
            {event.location}
          </p>
          <p className="text-forest text-xl">
            <span className="font-fascinate">Theme: </span>
            {event.theme}
          </p>
          <p className="text-forest text-xl">
            <span className="font-fascinate">Status: </span>
            {event.status}
          </p>
        </div>

        <div className="button-container">
          {event.status !== 'cancelled' && (
            <>
              <button 
                onClick={handleUpdateEvent}
                className="btn-primary"
              >
                <FaPencilAlt size={16} />
                <span>Update</span>
              </button>
              <button 
                onClick={() => openModal('cancel')}
                className="btn-secondary"
              >
                <FaTimes size={16} />
                <span>Cancel</span>
              </button>
            </>
          )}
          {event.status === 'cancelled' && (
            <button 
              onClick={() => openModal('delete')}
              className="btn-primary"
            >
              <FaTimes size={16} />
              <span>Delete</span>
            </button>
          )}
        </div>
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
