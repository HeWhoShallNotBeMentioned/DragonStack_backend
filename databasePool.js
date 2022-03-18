const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration');
require('dotenv').config();

//const pool = new Pool(databaseConfiguration);

const pool = new Pool({
  user: 'node_user',
  host: 'localhost',
  database: 'dragonstackdb',
  password: 'node_password',
  port: 5432,
});

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   pool.query('SELECT * FROM generation', (error, response) => {
//     if (error) {
//       return console.error('error', error);
//     }
//     console.log('response.rows', response.rows);
//   });
// });

module.exports = pool;
