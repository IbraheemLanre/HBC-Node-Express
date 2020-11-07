"use strict";

const {
  getAllCars,
  getCar,
  getWithModel,
  getWithLicence,
} = require("./carStorage");

console.log(getAllCars());

console.log("\n--------------------\n");

console.log(getCar("model", "Hoppa"));

console.log("\n--------------------\n");

console.log(getCar("model", "x"));

console.log("\n--------------------\n");

console.log(getCar("price", 30000));

console.log("\n--------------------\n");

const car = getWithLicence("ABC-1");
if (car) {
  console.log(car.model);
}

console.log("\n--------------------\n");

for (let car of getWithModel("Hoppa")) {
  console.log(car);
}
