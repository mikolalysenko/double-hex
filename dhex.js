module.exports = doubleToHex

var bits  = require('bit-twiddle')
var dbits = require('double-bits')

function doubleToHex(num) {
  if(isNaN(num))        { return 'NaN'}
  if(num === -Infinity) { return '-Infinity' }
  if(num === Infinity)  { return 'Infinity' }

  if(num === num>>>0) {
    return '0x' + num.toString(16) + 'p0'
  } else if(num === (num|0)) {
    return '-0x' + (-num).toString(16) + 'p0'
  }

  var s  = dbits.sign(num)
  var f  = dbits.fraction(num)
  var e  = dbits.exponent(num)

  //Handle denormals
  var b = 53
  if(f[1]) {
    b = 32 + bits.log2(f[1]) + 1
  } else {
    b = bits.log2(f[0]) + 1
  }
  var shift = 0
  if(b < 53) {
    shift = 53 - b
    e -= 52 - b
  }
  
  //Left justify
  var eRounded = Math.floor(e/4)*4
  shift += e - eRounded
  e = eRounded

  //Apply shift to fractional part
  var result = []
  while(shift > 32) {
    shift -= 32
    result.push(0)
  }
  if(shift > 0) {
    result.push(
        (f[0] << shift)>>>0, 
        ((f[1]<<shift) | (f[0]>>>(32-shift)))>>>0, 
        f[1]>>>(32-shift))
  } else {
    result.push(f[0], f[1])
  }
  f = result

  //Generate fractional string
  var fstr = ''
  for(var i=0; i<f.length; ++i) {
    var x = (f[i]>>>0).toString(16)
    while(x.length < 8) {
      x = '0' + x
    }
    fstr = x + fstr
  }

  //Trim 0s
  while(fstr.charAt(0) === '0') {
    fstr = fstr.slice(1)
  }
  while(fstr.charAt(fstr.length - 1) === '0') {
    fstr = fstr.slice(0, fstr.length-1)
  }

  e = e >> 2
  if(e < 0 && (fstr.length - e) <= 16) {
    //For small fractions, we pad using 0s
    var prefix = '0.'
    e += 1
    while(e < 0) {
      prefix += '0'
      e += 1
    }
    fstr = prefix + fstr
  } else if(e > 0 && e <= 16) {
    //For small numbers, 
    while(fstr.length < e) {
      fstr = fstr + '0'
    }
    if(fstr.length > e+1) {
      fstr = fstr.slice(0,e+1) + '.' + fstr.slice(e+1)
    }
    e = 0
  } else {
    //Add decimal if needed
    if(fstr.length > 1) {
      fstr = fstr.charAt(0) + '.' + fstr.slice(1)
    }
  }

  var sstr = s ? '-' : ''
  var estr = 'p' + (4*e).toString(10)
  return sstr + '0x' + fstr + estr
}