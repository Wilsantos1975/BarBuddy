const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const eventsController = require('./controllers/eventsController');
// const batchRecipesController = require('./controllers/batchRecipesController');
const cocktailController = require('./controllers/cocktailController');


const app = express(); // Ensure app is initialized as an Express application


app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(logger('dev')); // Enable logging

app.use('/events', eventsController); // Use the events routes

app.use('/cocktails', cocktailController); // Add this line

// Add these middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     success: false, 
//     error: 'Something broke!' 
//   });
// });

//health check route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add this near your other routes
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});


module.exports = app; // Export the app for testing




