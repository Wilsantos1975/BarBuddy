const express = require('express');
const events = express.Router();


const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../queries/eventQueries');

events.get('/', async (req, res) => {
  const allEvents = await getAllEvents();
  res.json(allEvents);
}   
);

events.get('/:id', async (req, res) => {
    const { id } = req.params;
    const event = await getEventById(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
    }   
);

events.post('/', async (req, res) => {
    const newEvent = req.body;
    const createdEvent = await createEvent(newEvent);
    res.json(createdEvent);
    }
);

events.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;
    const event = await updateEvent(id, updatedEvent);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
    }
);

events.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedEvent = await deleteEvent(id);
    if (deletedEvent) {
        res.json(deletedEvent);
    } else {
        res.status(404).send('Event not found');
    }
    }
);

module.exports = events;

