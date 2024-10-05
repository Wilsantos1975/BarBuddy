import React, { useState } from 'react';

const EventWizard = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [cocktailSuggestion, setCocktailSuggestion] = useState('');

  const events = [
    'Birthday', 'Bachelor Party', 'Bar Mitzvah', 'Quinceañera', 'Wedding',
    'Divorce', 'Breakup', 'Promotion', 'Award', 'Business'
  ];

  const cocktailSuggestions = {
    'Birthday': 'Birthday Cake Martini',
    'Bachelor Party': 'Long Island Iced Tea',
    'Bar Mitzvah': 'Shirley Temple',
    'Quinceañera': 'Strawberry Margarita',
    'Wedding': 'Champagne Cocktail',
    'Divorce': 'Bitter Tears (Negroni variation)',
    'Breakup': 'Dark & Stormy',
    'Promotion': 'Old Fashioned',
    'Award': 'Golden Dream',
    'Business': 'Classic Martini'
  };

  const handleEventChange = (event) => {
    const selectedEvent = event.target.value;
    setSelectedEvent(selectedEvent);
    setCocktailSuggestion(cocktailSuggestions[selectedEvent] || '');
  };

  return (
    <div className="event-wizard">
      <h2>Event Wizard</h2>
      <select value={selectedEvent} onChange={handleEventChange}>
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event} value={event}>
            {event}
          </option>
        ))}
      </select>
      {cocktailSuggestion && (
        <div className="cocktail-suggestion">
          <h3>Suggested Cocktail:</h3>
          <p>{cocktailSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default EventWizard;
