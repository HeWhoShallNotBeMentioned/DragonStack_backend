const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration');
require('dotenv').config();

const pool = new Pool(databaseConfiguration);

module.exports = pool;
