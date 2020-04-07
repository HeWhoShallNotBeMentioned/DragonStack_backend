const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res, sessionId }) => {
  let session, sessionString;
  return new Promise(async (resolve, reject) => {
    try {

      if (sessionId) {
        sessionString = Session.sessionString({ username, id: sessionId });
        setSessionCookie({ sessionString, res });
        resolve({ message: 'session restored' });
      } else {
        session = new Session({ username })
        sessionString = session.toString();

        let sessionIdReturned = await AccountTable.updateSessionId({ sessionId: session.id, usernameHash: hash(username) });

        setSessionCookie({ sessionString, res });
        resolve({ message: 'session created' });
      }
    } catch (error) {
      reject(error);
    }
  })

};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true,
    //Requires https connection for cookie access. Turned off as our dev env does not have https.
    //secure: true
  });
};

module.exports = { setSession, setSessionCookie };
