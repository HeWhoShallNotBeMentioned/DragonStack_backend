const pool = require('../../databasePool');

class GenerationTable {
  static storeGeneration(generation) {
    pool.query(
      'INSERT INTO generation(expiration) VALUES($1)',
      [generation.expiration],
      (error, response) => {
        if (error) {
          return console.error('error', error);
        }
        // else {
        //   return console.log('insert generation into db ', response);
        // }
      }
    );
  }
}

module.exports = GenerationTable;
