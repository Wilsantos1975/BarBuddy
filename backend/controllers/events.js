const eventQueries = require("../queries/eventQueries");

// Controller to get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await eventQueries.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

// Controller to get a single event by ID
const getSingleEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventQueries.getSingleEvent(id);
        if (event.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

// ... existing code for other event-related controllers ...

module.exports = { getAllEvents, getSingleEvent };
