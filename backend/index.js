const Generation = require('./generation');

const generation = new Generation();

console.log('generation', generation)

const oopty = generation.newDragon()

console.log('oopty', oopty)

setTimeout(()=> {
  const bloop =  generation.newDragon({nickname: "bloop"})
  console.log("bloop", bloop)
}, 15000);

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