const app = require('../app/index');

const port = 3000;

app.listen(port, () => {
  console.log('backend server is connected port ' + port);
});
