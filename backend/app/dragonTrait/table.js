const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

class DragonTraitTable {
  static storeDragonTable({ dragonId, traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue })
        .then(({ traitId }) => {
          `INSERT INTO dragonTrait("traitId", "dragonId")
        VALUES($1, $2)`,
            [traitId, dragonId],
            (error, response) => {
              if (error) {
                return reject(error);
              }

              resolve();
            }
        })
    })
  }
}

module.exports = DragonTraitTable;
