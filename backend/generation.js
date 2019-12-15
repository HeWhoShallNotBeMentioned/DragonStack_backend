const {REFRESH_RATE, SECOND} = require('./config')

const refreshRate = REFRESH_RATE * SECOND;

class Generation {
  constructor(props) {
    super(props)
    this.expiration = this.calculateExpiration;
  }

  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));

    const msUntilExpiration = Math.random() < 0.5 ?
      refreshRate - expirationPeriod :
      refreshRate + expirationPeriod;
      
    return new Date(Date.now() + msUntilExpiration);
  }
}

module.exports = Generation