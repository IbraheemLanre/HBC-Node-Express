"use strict";

const cars = require("./cars.json");

const getCar = (key, value) => {
  const carsFound = [];
  for (let car of cars) {
    if (car[key] === value) {
      carsFound.push(car);
    }
  }
  return carsFound;
};

module.exports = {getCar}