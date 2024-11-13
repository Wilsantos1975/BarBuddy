const db = require("../db/index");


// Function to get all events
const getAllEvents = async () => {
    try {
        const events = await db.any("SELECT * FROM events");
        return events;
    } catch (error) {
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
            "INSERT INTO events (name, date, time, location, theme, organizer_id, invitee_count, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [event.name, event.date, event.time, event.location, event.theme, event.organizer_id, event.invitee_count, 'active']
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
            "UPDATE events SET name = COALESCE($1, name), date = COALESCE($2, date), time = COALESCE($3, time), location = COALESCE($4, location), theme = COALESCE($5, theme), status = COALESCE($6, status) WHERE id = $7 RETURNING *",
            [event.name, event.date, event.time, event.location, event.theme, event.status, id]
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

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
