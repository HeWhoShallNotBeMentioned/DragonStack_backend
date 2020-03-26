const pool = require('../../databasePool');

class AccountTable {
  static storeAccount({ username, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO account(username, password) VALUES($1, $2) RETURNING id',
        [username, password],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          const accountId = response.rows[0].id;

          resolve({ accountId: accountId });
        }
      );
    });
  }
}

module.exports = AccountTable;
