const pool = require('../../databasePool');

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accountDragon("accountId", "dragonId")
          VALUES($1, $2)`,
        [accountId, dragonId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          //const traitId = response.rows[0].id;
          resolve();
        }
      )
    });
  }
}


module.exports = AccountDragonTable;
