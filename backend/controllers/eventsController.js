const express = require('express');
const events = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  recommendCocktails
} = require('../queries/eventQueries');

events.get('/', async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.json(allEvents);
  } catch (error) {
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
    const newEvent = await createEvent(req.body);
    const recommendedCocktails = await recommendCocktails(newEvent.id, newEvent.theme);
    res.status(201).json({ ...newEvent, recommended_cocktails: recommendedCocktails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

events.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEvent = await updateEvent(id, req.body);
    res.json(updatedEvent);
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
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
