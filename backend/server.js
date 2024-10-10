require('dotenv').config();

const express = require('express'); // Ensure Express is imported
const app = express(); // Ensure app is initialized as an Express application

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})