const { Router } = require('express');
const DragonTable = require('../dragon/table');
const { getDragonWithTraits, getPublicDragons } = require('../dragon/helper');
const AccountTable = require('../account/table');
const { authenticatedAccount } = require('./helper');
const AccountDragonTable = require('../accountDragon/table');

const router = new Router();

router.get('/new', async (req, res, next) => {
  try {
    let accountId, dragon;

    let { account } = await authenticatedAccount({ sessionString: req.cookies.sessionString });
    accountId = account.id;
    dragon = await req.app.locals.engine.generation.newDragon();
    const { dragonId } = await DragonTable.storeDragon(dragon);
    let nothingReturned = await AccountDragonTable.storeAccountDragon({ accountId, dragonId })
    dragon.dragonId = dragonId;

    res.json({ dragon });
  } catch (error) {
    console.log(error);
    next(error);
  }
});



router.put('/update', async (req, res, next) => {
  try {
    const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;
    console.log("sireValue", sireValue)
    const somethingNotUsed = await DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue });
    res.json({ message: 'successfully updated dragon' })
  } catch (error) {
    next(error)
  }
})

router.get('/public-dragons', async (req, res, next) => {
  try {
    const dragons = await getPublicDragons();

    res.json({ dragons });

  } catch (error) {
    next(error);
  }
})

router.get('/single-dragon/:id', async (req, res, next) => {
  try {
    const dragon = await getDragonWithTraits({ dragonId: req.params.id });
    res.json({ dragon });
  } catch (error) {
    console.error(error);
    next(error)
  }
});

router.post('/buy', async (req, res, next) => {
  try {
    const { dragonId, saleValue } = req.body;
    let buyerId;

    const dragon = await DragonTable.getDragon({ dragonId })

    if (dragon.saleValue !== saleValue) {
      throw new Error('Sale value is not correct.')
    }

    if (!dragon.isPublic) {
      throw new Error('Dragon is not for sale.')
    }

    const { account, authenticated } = await authenticatedAccount({ sessionString: req.cookies.sessionString });
    console.log("authenticated", authenticated);

    if (!authenticated) {
      throw new Error('Unauthenticated');
    }

    if (saleValue > account.balance) {
      throw new Error("Sale value exceeds balance.");
    }

    buyerId = account.id;

    const { accountId } = await AccountDragonTable.getDragonAccount({ dragonId });
    if (accountId === buyerId) {
      throw new Error("Buyer and seller cannot be the same account.");
    }
    const sellerId = accountId;

    const nothingReturned = await Promise.all(
      [
        AccountTable.updateBalance({
          accountId: sellerId, value: saleValue
        }),
        AccountTable.updateBalance({
          accountId: buyerId, value: -saleValue
        }),
        AccountDragonTable.updateDragonAccount({
          dragonId, accountId: buyerId
        }),
        DragonTable.updateDragon({
          dragonId, isPublic: false
        })
      ]
    )

    res.json({ message: "success!" });
  } catch (error) {
    next(error);
  }

})

module.exports = router;
