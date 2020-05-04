const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');

const getDragonWithTraits = async ({ dragonId }) => {
  try {
    let dragonPromises = await Promise.all([
      DragonTable.getDragon({ dragonId }),
      new Promise((resolve, reject) => {
        pool.query(`SELECT "traitType", "traitValue"
      FROM trait
      INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
      WHERE dragonTrait."dragonId" = $1`,
          [dragonId],
          (error, response) => {
            if (error) {
              return reject(error);
            };

            resolve(response.rows);
          }
        )
      })
    ])

    return new Dragon({ dragon: dragonPromises[0], dragonId, traits: dragonPromises[1] })
  } catch (error) {
    console.error(error)
  }
}

const getPublicDragons = async () => {
  try {
    let publicDragonPromises = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT id FROM dragon WHERE "isPublic" = TRUE`,
        (error, response) => {
          if (error) {
            return reject(error);
          };

          const publicDragonRows = response.rows;

          console.log("publicDragonRows-----", publicDragonRows);

          let dragons = Promise.all(publicDragonRows.map(
            ({ id }) => {
              return getDragonWithTraits({ dragonId: id })
            }))

          resolve(dragons);
        }
      )
    })
    console.log("publicDragonPromises", publicDragonPromises)
    return publicDragonPromises
  } catch (error) {
    reject(error);
  }
}


module.exports = { getDragonWithTraits, getPublicDragons };
