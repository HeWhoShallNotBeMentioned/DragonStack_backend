const express = require('express');

const GenerationEngine = require('./engine');

const app = express();
const engine = new GenerationEngine();
const port = 3000

engine.start();

app.get('/dragon/new', (req, res) => {
  res.json({dragon: engine.generation.newDragon() })
})

app.listen(port, () => {
  console.log("backend server is connected port " + port)
})


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