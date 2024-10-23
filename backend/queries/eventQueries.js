const db = require("../db/index");


// Function to get all events with optional filtering
const getAllEvents = async (status, future) => {
    try {
<<<<<<< HEAD
        const events = await db.any("SELECT * FROM events");
        return events;
    } catch (error) {
=======
        let query = 'SELECT * FROM events';
        const queryParams = [];
        const conditions = [];

        if (status) {
            conditions.push('status = $1');
            queryParams.push(status);
        }

        if (future === 'true') {
            conditions.push('date >= CURRENT_DATE');
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY date';

        return await db.any(query, queryParams);
    } catch (error) {
        console.error("Error fetching events:", error);
>>>>>>> 5e7c643 (coomit to pull origin mail and updates from Macbook pro)
        throw error;
    }
};

// Function to get a single event by ID
const getEventById = async (id) => {
    try {
        const event = await db.one("SELECT * FROM events WHERE id = $1", id);
        return event;
    } catch (error) {
        throw error;
    }
};

// Function to create a new event
const createEvent = async (event) => {
    try {
        const newEvent = await db.one(
            "INSERT INTO events (name, date, time, location, theme, organizer_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [event.name, event.date, event.time, event.location, event.theme, event.organizer_id]
        );
        return newEvent;
    } catch (error) {
        throw error;
    }
};

// Function to update an existing event
const updateEvent = async (id, event) => {
    try {
        const updatedEvent = await db.one(
            "UPDATE events SET name = $1, date = $2, time = $3, location = $4, theme = $5 WHERE id = $6 RETURNING *",
            [event.name, event.date, event.time, event.location, event.theme, id]
        );
        return updatedEvent;
    } catch (error) {
        throw error;
    }
};

// Function to delete an event
const deleteEvent = async (id) => {
    try {
        const deletedEvent = await db.one("DELETE FROM events WHERE id = $1 RETURNING *", id);
        return deletedEvent;
    } catch (error) {
        throw error;
    }
};

// Function to get user events
const getUserEvents = async (userId) => {
    try {
        return await db.any("SELECT * FROM events WHERE organizer_id = $1", [userId]);
    } catch (error) {
        console.error("Error fetching user events:", error);
        throw error;
    }
};

// Function to recommend cocktails for an event
const recommendCocktails = async (eventId, theme) => {
    // Implement cocktail recommendation logic based on event theme
    // This is a placeholder implementation
    try {
        const cocktails = await db.any('SELECT id FROM cocktails ORDER BY RANDOM() LIMIT 3');
        const cocktailIds = cocktails.map(c => c.id);
        await db.none('UPDATE events SET recommended_cocktails = $1 WHERE id = $2', [cocktailIds, eventId]);
        return cocktailIds;
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, recommendCocktails };
