var toHex = require('../dhex')

console.log(toHex(1))
console.log(toHex(0))
console.log(toHex(-1))
console.log(toHex(0.5))
console.log(toHex(1.55e1))

console.log(toHex(10004.1251273))

console.log(toHex(1/3))

console.log(toHex(Infinity))
console.log(toHex(-Infinity))
console.log(toHex(NaN))


for(var i=1020; i<1060; ++i) {
  console.log(toHex(Math.pow(2, -i)))
}
