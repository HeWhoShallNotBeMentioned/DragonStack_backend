const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const Session = require('../account/session');

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

      const session = new Session({ username })
      const sessionString = session.toString();
      res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        //Requires https connection for cookie access. Turned off as our dev env does not have https.
        //secure: true
      });
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
