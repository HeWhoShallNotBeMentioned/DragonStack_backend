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

AccountDragonTable.storeAccountDragon({ accountId: 2, dragonId: 3 })
  .then(() => console.log('stored an account dragon'))
  .catch((error) => console.error("error----------  ", error));

module.exports = AccountDragonTable;
