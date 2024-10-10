const { get } = require("../app");
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
const getSingleEvent = async (eventId) => {
    try {
        return await db.any("SELECT * FROM events WHERE id = ?", [eventId]);
    } catch (error) {
        console.error("Error fetching single event:", error);
        throw error;
    }
};

// ... existing code ...

module.exports = { getAllEvents, getSingleEvent }