const express = require('express');
const events = express.Router();


const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getUserEvents } = require('../queries/eventQueries');

events.get('/', async (req, res) => {
  try {
    const { status, future } = req.query;
    const allEvents = await getAllEvents(status, future);
    console.log(allEvents)
    res.json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Error fetching events' });
  }
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
    try {
        const newEvent = req.body;
        const createdEvent = await createEvent(newEvent);
        const recommendedCocktails = await getRecommendedCocktails(newEvent.theme);
        res.json({ ...createdEvent, recommendedCocktails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

events.post('/:id/save-batch-recipe', async (req, res) => {
    try {
        const { id } = req.params;
        const batchRecipe = req.body;
        const savedRecipe = await saveBatchRecipe(id, batchRecipe);
        res.json(savedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Comment out or remove this route if you haven't implemented email functionality yet
/*
events.post('/:id/send-invitations', async (req, res) => {
    try {
        const { id } = req.params;
        const { invitees } = req.body;
        const event = await getEventById(id);
        await Promise.all(invitees.map(invitee => sendInvitationEmail(event, invitee)));
        res.json({ message: 'Invitations sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

module.exports = events;
