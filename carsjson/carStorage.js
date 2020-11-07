"use strict";

const cars = require("./cars.json");

const getAllCars = () => {
  return cars;
};

const getCar = (key, value) => {
  const carsFound = [];
  for (let car of cars) {
    if (car[key] === value) {
      carsFound.push(car);
    }
  }
  return carsFound;
};

const getWithModel = (model) => {
  const found = [];
  for (let car of cars) {
    if (car.model.toLowerCase() === model.toLowerCase()) {
      found.push(car);
    }
  }
  return found;
};

const getWithLicence = (licence) => {
  for (let car of cars) {
    if (car.licence.toLowerCase() === licence.toLowerCase()) {
      return car;
    }
  }
  return null;
};

module.exports = { getAllCars, getCar, getWithModel, getWithLicence };
