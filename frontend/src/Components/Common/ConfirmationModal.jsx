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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-[#EBDFC7] p-6 rounded-lg shadow-xl max-w-md w-full m-4">
                <h2 className="text-2xl font-bold mb-4 text-[#1E1C1A]">
                    {title}
                </h2>
                <p className="mb-6 text-[#1E1C1A]">
                    {message}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={primaryAction}
                        className="flex-1 px-4 py-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors"
                    >
                        {primaryButtonText}
                    </button>
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction}
                            className="flex-1 px-4 py-2 bg-red-500 text-[#EBDFC7] rounded-lg hover:bg-red-600 transition-colors"
                        >
                            {secondaryButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;