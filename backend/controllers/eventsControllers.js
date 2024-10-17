const express = require('express');
const events = express.Router();


const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getUserEvents } = require('../queries/eventQueries');

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
        res.json(deletedEvent, { message: 'event deleted successfully' });
    } else {
        res.status(404).send('Event not found');
    }
    }
);

// // New route for getting events by user ID
// events.get('/user/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const userEvents = await getUserEvents(userId);
//     res.json(userEvents);
//   } catch (error) {
//     console.error("Error fetching user events:", error);
//     res.status(500).json({ error: 'Error fetching user events' });
//   }
// });

module.exports = events;
