import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function EventCard({ event, onCancelEvent, onDeleteEvent, }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

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
      <p className="text-gray-600">Status: {event.status}</p>
      {event.status !== 'cancelled' ? (
        <button 
          onClick={() => openModal('cancel')}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel Event
        </button>
      ) : (
        <button 
          onClick={() => openModal('delete')}
          className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Delete Event
        </button>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        message={modalAction === 'cancel' 
          ? 'Are you sure you want to cancel this event?' 
          : 'Are you sure you want to delete this event? This action cannot be undone.'}
      />
    </div>
  );
}

export default EventCard;
