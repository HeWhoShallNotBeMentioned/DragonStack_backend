require('dotenv').config();
const app = require('../app/index');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log('backend server is connected port ' + port);
});
