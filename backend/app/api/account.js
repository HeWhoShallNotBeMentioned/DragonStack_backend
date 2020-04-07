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
      res.json(settingSession);
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

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { account } = await AccountTable.getAccount({ usernameHash: hash(username) })
    if (account && account.passwordHash === hash(password)) {
      let settingSession = await setSession({ username, res });
      res.json(settingSession);
    } else {
      const error = new Error('Invalid username or password');
      error.status = 409;
      throw (error);
    }

  } catch (err) {
    next(err);
  }
});

module.exports = router;
