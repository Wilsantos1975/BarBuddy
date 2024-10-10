const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express(); // Ensure app is initialized as an Express application

const PORT = process.env.PORT || 3000; // Define the PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

