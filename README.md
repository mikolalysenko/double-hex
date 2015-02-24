double-hex
==========
Convert IEEE 754 double precision numbers into [C99-style hex floats](https://gcc.gnu.org/onlinedocs/gcc/Hex-Floats.html).

## What is a hexadecimal float and why would I use one?

Hexadecimal floats are the base 16 version of a regular floating point number.  They are useful when debugging routines which manipulate floating point numbers since it is easier to inspect their contents than it is with decimal floats (which are often rounded when displayed to make things look nicer).  Hex floats may not be as pretty as decimal floats to an average user, but they present the information stored in a float value more honestly.

Here is an example of a hexadecimal float string:

```
0x10a.fbcp-20
```

Breaking it down, the parts of the float are as follows:

```
 0x    10a  .  fbc     p  -20
\__/  \___/ | \___/    | \___/
 |     |    |  |       |  |
 +-Prefix   +-Decimal  +-Delimiter
       |       |          |
       +-Whole number     +-Exponent
               |
               +-Fraction
```

The whole number and fractional part of the float is interpreted as a fixed point decimal fraction,

```
0x10a.fbc = 0x10afbc * 16⁻³ = 266.9833984375
```

While the exponent is a power of two which is multiplied by the number,

```
p-20 = 2⁻²⁰
```

Putting it all together,

```
0x10a.fbcp-20 = 0x10afbc * 16⁻³ * 2⁻²⁰ = 0.0002546152099967003
```

# Example

```javascript
var doubleToHex = require('double-hex')

var numbers = [1, -1, 0, 0.5, 0.1, 1e20, Math.pow(2, -1024) ]
numbers.forEach(function(n) {
  console.log('dec:', n, 'hex:', doubleToHex(n))
})
```

Output:

```
dec: 1 hex: 0x1p0
dec: -1 hex: -0x1p0
dec: 0 hex: 0x0p0
dec: 0.5 hex: 0x0.8p0
dec: 0.1 hex: 0x0.1999999999999ap0
dec: 100000000000000000000 hex: 0x56bc75e2d6310000p0
dec: 5.562684646268003e-309 hex: 0x1p-1024
```

# Install

```
npm i double-hex
```

# API

#### `var hexf = require('double-hex')(num)`
Converts `num` into a hexadecimal string

* `num` is a Number

**Returns** A C99 style hex string encoding number.

# License
(c) 2015 Mikola Lysenko. MIT License