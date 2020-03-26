const { Router } = require('express');

const AccountTable = require('../account/table');

const router = new Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const response = await AccountTable.storeAccount({ username, password });
    res.json({ message: 'success!' });
  } catch (err) {
    //res.json({ message: err.message });
    next(err);
  }
});

module.exports = router;
