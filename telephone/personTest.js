"use strict";

const {
  getTypes,
  getNumbersByType,
  getAllNumbersByType,
  getAllNumbers,
  getName,
} = require("./phone");

console.log(getTypes());

console.log("\n----------------------------\n");
console.log(JSON.stringify(getAllNumbers(), null, "\t"));

console.log("\n----------------------------\n");
console.log(getName("05050302"));

try {
  console.log(getNumbersByType("Matt", "river", "WORK"));
} catch (error) {
  console.log("Error: " + error.message);
}

console.log("\n----------------------------\n");
try {
  console.log(getAllNumbersByType("work"));
} catch (error) {
  console.log(error.message);
}
