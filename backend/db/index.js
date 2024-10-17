const pgp = require('pg-promise')();
require('dotenv').config();

// const dbURL = process.env.DB_URL;

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

module.exports = db;
