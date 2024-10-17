const pgp = require('pg-promise')();
require('dotenv').config();

// const dbURL = process.env.DB_URL;
<<<<<<< HEAD

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
=======

const databaseConfig = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
}

// const cn = {
//     connectionString: dbURL,
//     allowExitOnIdle: true,
//     max: 30,

// }


//test connection
const testConnection = async () => {
    const db = pgp(databaseConfig);
    try {
        await db.connect();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();







const db = pgp(databaseConfig);
>>>>>>> 10bcde8 (fix the issue from macpro, the previous commint was from the macair, pulling changes)

module.exports = db;
