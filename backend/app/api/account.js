const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const router = new Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    const response = await AccountTable.storeAccount({ usernameHash, passwordHash });
    res.json({ message: 'success!' });
  } catch (err) {
    //res.json({ message: err.message });
    next(err);
  }
});

module.exports = router;
