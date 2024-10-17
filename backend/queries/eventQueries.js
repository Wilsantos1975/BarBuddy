const db = require("../db/index");


// Function to get all events
const getAllEvents = async () => {
    try {
        return await db.any("SELECT * FROM events");
    } catch (error) {
        console.error("Error fetching all events:", error);
        throw error;
    }
};

// Function to get a single event by ID
const getEventById = async (eventId) => {
    try {
        return await db.one("SELECT * FROM events WHERE id = $1", [eventId]);
    } catch (error) {
        console.error("Error fetching single event:", error);
        throw error;
    }
};

// Function to create a new event
const createEvent = async (event) => {
    try {
        return await db.one(
            "INSERT INTO events (name, date, location, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [event.name, event.date, event.location, event.description]
        );
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

// Function to update an existing event
const updateEvent = async (eventId, event) => {
    try {
        return await db.one(
            "UPDATE events SET name = $1, date = $2, location = $3, description = $4 WHERE id = $5 RETURNING *",
            [event.name, event.date, event.location, event.description, eventId]
        );
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

// Function to delete an event
const deleteEvent = async (eventId) => {
    try {
        return await db.one("DELETE FROM events WHERE id = $1 RETURNING *", [eventId]);
    } catch (error) {
        console.error("Error deleting event:", error);
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

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getUserEvents };
