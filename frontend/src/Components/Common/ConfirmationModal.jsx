import React from 'react';

function ConfirmationModal({ 
    isOpen, 
    title, 
    message, 
    primaryAction, 
    secondaryAction, 
    primaryButtonText = "Confirm", 
    secondaryButtonText = "Cancel" 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="mb-4">
                    {message}
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={secondaryAction}
                        className="btn-secondary"
                    >
                        {secondaryButtonText}
                    </button>
                    <button
                        onClick={primaryAction}
                        className="btn-primary"
                    >
                        {primaryButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;