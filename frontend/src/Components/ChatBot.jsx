import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatBot = ({ eventDetails }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initial greeting based on event details
  useEffect(() => {
    if (eventDetails) {
      const initialMessage = {
        type: 'bot',
        content: `Hi! I see you're planning a ${eventDetails.eventType} for ${eventDetails.guestCount} guests. 
                 Would you like some cocktail suggestions based on your event details?`
      };
      setMessages([initialMessage]);
    }
  }, [eventDetails]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateSuggestions = async () => {
    setIsTyping(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cocktail-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
      
      const suggestions = await response.json();
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: suggestions.message,
        cocktails: suggestions.cocktails
      }]);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I'm sorry, I'm having trouble generating suggestions right now."
      }]);
    }
    setIsTyping(false);
  };

  const handleUserInput = async (userChoice) => {
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: userChoice
    }]);

    // Simulate bot thinking
    setIsTyping(true);
    
    // Add bot response based on user choice
    setTimeout(() => {
      if (userChoice.toLowerCase() === 'yes') {
        generateSuggestions();
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: "No problem! Let me know if you need suggestions later."
        }]);
        setIsTyping(false);
      }
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg"
    >
      <div className="p-4 bg-[#51657D] text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Cocktail Assistant</h3>
        <button className="text-white hover:text-gray-200">
          <span className="sr-only">Close</span>
          ×
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-[#51657D] text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              <p>{message.content}</p>
              {message.cocktails && (
                <div className="mt-2">
                  {message.cocktails.map((cocktail, idx) => (
                    <div key={idx} className="mt-1 text-sm">
                      • {cocktail.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="text-gray-500 text-sm">
            Assistant is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <button
            onClick={() => handleUserInput('Yes')}
            className="flex-1 px-4 py-2 bg-[#51657D] text-white rounded hover:bg-[#51657D]/90 transition-colors"
          >
            Yes, please!
          </button>
          <button
            onClick={() => handleUserInput('No')}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            No, thanks
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;
