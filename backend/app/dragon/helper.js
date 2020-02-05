const pool = require('../../databasePool');
const DragonTable = require('./table');

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.letDragon({ dragonId })
  ])
};

module.exports = getDragonWithTraits;
