const { Router } = require('express');
const DragonTable = require('../dragon/table');
const { getDragonWithTraits, getPublicDragons } = require('../dragon/helper');
const accountDragonTable = require('../accountDragon/table');
const { authenticatedAccount } = require('./helper');

const router = new Router();

router.get('/new', async (req, res, next) => {
  try {
    let accountId, dragon;

    let { account } = await authenticatedAccount({ sessionString: req.cookies.sessionString });
    accountId = account.id;
    dragon = await req.app.locals.engine.generation.newDragon();
    const { dragonId } = await DragonTable.storeDragon(dragon);
    console.log('dragonId--- ', dragonId);
    let nothingReturned = await accountDragonTable.storeAccountDragon({ accountId, dragonId })
    dragon.dragonId = dragonId;

    res.json({ dragon });
  } catch (error) {
    console.log(error);
    next(error);
  }
});



router.put('/update', async (req, res, next) => {
  try {
    const { dragonId, nickname, isPublic, saleValue } = req.body;
    const somethingNotUsed = await DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue });
    res.json({ message: 'successfully updated dragon' })
  } catch (error) {
    next(error)
  }
})

router.get('/public-dragons', async (req, res, next) => {
  try {
    const dragons = await getPublicDragons();
    console.log("dragons", dragons)
    res.json(dragons);

  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {

    const { dragon } = await getDragonWithTraits({ dragonId: req.params.id });
    res.json({ dragon });
  } catch (error) {
    console.error(error);
    next(error)
  }
});

module.exports = router;
