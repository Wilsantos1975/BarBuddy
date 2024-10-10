const pgp = require('pg-promise')();
require('dotenv').config();

const dbURL = process.env.DB_URL;

const cn = {
    connectionString: dbURL,
    allowExitOnIdle: true,
    max: 30,

}

const db = pgp(cn);

module.exports = db;