const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// const eventsControllers = require("./controllers/eventsControllers");
const recipesController = require('./controllers/recipesControllers');
const eventsController = require('./controllers/eventsController');
const batchRecipesController = require('./controllers/batchRecipesController');


const app = express(); // Ensure app is initialized as an Express application


app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(logger('dev')); // Enable logging

app.use('/events', eventsController); // Use the events routes
app.use('/batch-recipes', batchRecipesController);
app.use('/recipes', recipesController);



//health check route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app; // Export the app for testing




