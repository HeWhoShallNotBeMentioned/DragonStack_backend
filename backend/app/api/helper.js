const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username })
    const sessionString = session.toString();

    AccountTable.updateSessionId({ sessionId: session.id, usernameHash: hash(username) });

    res.cookie('sessionString', sessionString, {
      expire: Date.now() + 3600000,
      httpOnly: true,
      //Requires https connection for cookie access. Turned off as our dev env does not have https.
      //secure: true
    });

  })

};
module.exports = { setSession };
