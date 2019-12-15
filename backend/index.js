const Dragon = require('./dragon')

const fooey = new Dragon({birthdate: new Date(), nickname: 'fooey'});
const baloo = new Dragon({birthdate: new Date(), nickname: 'baloo'});
const boop = new Dragon({});
console.log("fooey", fooey);
console.log("baloo", baloo);
console.log("boop", boop);

setTimeout(()=> {
  const oopty = new Dragon({nickname: "oopty"})
  console.log("oopty",oopty)
}, 2500)