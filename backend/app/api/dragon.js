const { Router } = require('express');
const DragonTable = require('../dragon/table');
const { getDragonWithTraits } = require('../dragon/helper');

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

router.get('/:id', async (req, res, next) => {
  try {
    console.log("id", req.params.id);
    console.log("Inside get dragon by id route");
    const dragon = await getDragonWithTraits({ dragonId: req.params.id });
    res.json(dragon);
  } catch (error) {
    console.error(error);
    next(error)
  }
})

module.exports = router;
