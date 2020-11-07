'use strict'

const {getCar} = require('./carStorage')

console.log(getCar("model", "Hoppa"))
console.log(getCar("model", "x"))
console.log(getCar("price", 30000))
