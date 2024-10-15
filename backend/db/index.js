const pgp = require('pg-promise')();
require('dotenv').config();

// const dbURL = process.env.DB_URL;

// if (!dbURL) {
//     console.error("DB_URL is not defined in the environment variables.");
//     process.exit(1); // Exit the process if DB_URL is not set
// }
const databaseConfig = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER
};

// const cn = {
//     connectionString: dbURL,
//     allowExitOnIdle: true,
//     max: 30,
//     ssl: {
//         rejectUnauthorized: false // Adjust based on your SSL requirements
//     }
// };

const db = pgp(databaseConfig);

// Test the connection
db.connect()
    .then(obj => {
        console.log("Database connection successful");
        obj.done(); // success, release the connection
    })
    .catch(error => {
        console.error("Error connecting to the database:", error.message || error);
    });

module.exports = db;
