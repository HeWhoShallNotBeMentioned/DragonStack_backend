const { Router } = require('express');
const DragonTable = require('../dragon/table');

const router = new Router();

router.get('/new', async (req, res, next) => {
  try {
    const dragon = req.app.locals.engine.generation.newDragon();
    const { dragonId } = await DragonTable.storeDragon(dragon);
    console.log('dragonId--- ', dragonId);
    dragon.dragonId = dragonId;

    res.json({ dragon });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
