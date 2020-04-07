const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const session = new Session({ username })
      const sessionString = session.toString();

      let sessionIdReturned = await AccountTable.updateSessionId({ sessionId: session.id, usernameHash: hash(username) });

      res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        //Requires https connection for cookie access. Turned off as our dev env does not have https.
        //secure: true
      });
      resolve({ message: 'session created' });
    } catch (error) {
      reject(error);
    }
  })

};
module.exports = { setSession };
