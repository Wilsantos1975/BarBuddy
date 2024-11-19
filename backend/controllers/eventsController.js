const express = require('express');
const events = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,

} = require('../queries/eventQueries');

events.get('/', async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message });
  }
});

events.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await getEventById(id);
    res.json(event);
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
});

events.post('/', async (req, res) => {
  try {
    console.log('Received POST request to /events');
    console.log('Request body:', req.body);

    // Validate required fields
    const requiredFields = ['name', 'date', 'time', 'location', 'organizer_id', 'invitee_count'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    console.log('Creating new event...');
    const newEvent = await createEvent(req.body);
    console.log('Event created:', newEvent);

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in POST /events:', error);
    res.status(500).json({ error: error.message });
  }
});

events.put('/:id', async (req, res) => {
  console.log('Received PUT request to /events/:id');
  try {
    const { id } = req.params;
    const updatedEvent = await updateEvent(id, req.body);
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: error.message });
  }
});

events.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await deleteEvent(id);
    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
});

module.exports = events;
