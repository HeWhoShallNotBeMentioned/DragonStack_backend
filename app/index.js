const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');
const app = express();

const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(
  cors({
    origin: ['http://localhost:1234', 'http://localhost:5100'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account/', accountRouter);
app.use('/dragon/', dragonRouter);
app.use('/generation/', generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: 'error',
    message: err.message,
  });
});

engine.start();

module.exports = app;

// const Generation = require('./generation');

// const generation = new Generation();

// console.log('generation', generation)

// const oopty = generation.newDragon()

// console.log('oopty', oopty)

// setTimeout(()=> {
//   const bloop =  generation.newDragon()
//   console.log("bloop", bloop)
// }, 3000);

//const Dragon = require('./dragon')

// const fooey = new Dragon({birthdate: new Date(), nickname: 'fooey'});
// const baloo = new Dragon({birthdate: new Date(), nickname: 'baloo', traits: [{"backgroundColor": "pink"}]});
// const boop = new Dragon({});
// console.log("fooey", fooey);
// console.log("baloo", baloo);
// console.log("boop", boop);

// setTimeout(()=> {
//   const oopty = new Dragon({nickname: "oopty"})
//   console.log("oopty",oopty)
// }, 2500)
