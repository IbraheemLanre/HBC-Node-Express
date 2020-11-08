"use strict";

const persons = require("./directory.json");

const getTypes = () => {
  let types = [];
  for (let person of persons) {
    for (let phone of person.phones) {
      if (!types.includes(phone.type)) {
        types.push(phone.type);
      }
    }
  }
  return types;
};

const getNumbersByType = (firstname, lastname, type) => {
  if (firstname && lastname && type) {
    const numbers = [];
    for (let person of persons) {
      if (
        person.firstname.toLowerCase() === firstname.toLowerCase() &&
        person.lastname.toLowerCase() === person.lastname.toLowerCase()
      ) {
        for (let phone of person.phones) {
          if (phone.type.toLowerCase() === type.toLowerCase()) {
            numbers.push(phone.number);
          }
        }
      }
    }
    return numbers;
  } else {
    throw new Error("missing parameter");
  }
};

const getAllNumbersByType = (type) => {
  if (!type) {
    throw new Error("missing parameter");
  }
  const numbersFound = [];
  for (let person of persons) {
    for (let phone of person.phones)
      if (phone.type.toLowerCase() === type.toLowerCase()) {
        numbersFound.push({
          firstname: person.firstname,
          lastname: person.lastname,
          number: {
            type: phone.type,
            tel: phone.number,
          },
        });
      }
  }
  return numbersFound;
};

const getAllNumbers = () => {
  return persons;
};

const getName = (number) => {
  for (let person of persons) {
    for (let phone of person.phones) {
      if (phone.number === number) {
        return {
          firstname: person.firstname,
          lastname: person.lastname,
          number: phone.type,
        };
      }
    }
  }
  return null;
};

module.exports = {
  getTypes,
  getNumbersByType,
  getAllNumbersByType,
  getAllNumbers,
  getName,
};
