const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const { setSession } = require('./helper');
const router = new Router();

router.post('/signup', async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    const acctCheckResponse = await AccountTable.getAccount({ usernameHash });
    console.log("acctCheckResponse------------   ", acctCheckResponse)

    if (!acctCheckResponse.account) {
      const acctCreateResponse = await AccountTable.storeAccount({ usernameHash, passwordHash });

      let settingSession = await setSession({ username, res })
      res.json({ message: 'success!' });
    } else {
      const error = new Error("This username has already been taken.")
      error.statusCode = 409;
      throw (error)
    }

  } catch (err) {
    //res.json({ message: err.message });
    next(err);
  }
});

module.exports = router;
