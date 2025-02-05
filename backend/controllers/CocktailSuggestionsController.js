const express = require('express');
const router = express.Router();

router.post('/api/cocktail-suggestions', async (req, res) => {
  const { eventType, guestCount, budget, preferences } = req.body;
  
  try {
    // Logic to generate suggestions based on event details
    const suggestions = generateSuggestions(eventType, guestCount, budget, preferences);
    
    res.json({
      message: `Based on your ${eventType} event, here are some cocktail suggestions:`,
      cocktails: suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating suggestions' });
  }
});

function generateSuggestions(eventType, guestCount, budget, preferences) {
  // Example suggestion logic
  const suggestions = [];
  
  switch(eventType.toLowerCase()) {
    case 'wedding':
      suggestions.push(
        { name: 'Champagne Cocktail', complexity: 'easy', cost: 'medium' },
        { name: 'French 75', complexity: 'medium', cost: 'high' },
        { name: 'Signature Martini', complexity: 'medium', cost: 'medium' }
      );
      break;
    case 'birthday':
      suggestions.push(
        { name: 'Moscow Mule', complexity: 'easy', cost: 'medium' },
        { name: 'Margarita', complexity: 'easy', cost: 'medium' },
        { name: 'Mojito', complexity: 'medium', cost: 'medium' }
      );
      break;
    // Add more event types...
  }
  
  // Filter based on budget and other preferences
  return suggestions;
}

module.exports = router;