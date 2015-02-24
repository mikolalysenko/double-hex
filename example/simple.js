var doubleToHex = require('../dhex')

var numbers = [1, -1, 0, 0.5, 0.1, 1e20, Math.pow(2, -1024) ]
numbers.forEach(function(n) {
  console.log('dec:', n, 'hex:', doubleToHex(n))
})
