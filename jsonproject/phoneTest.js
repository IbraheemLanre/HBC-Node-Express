"use strict";

const persons = require("./register.json");
console.log(persons);

// console.log(persons[0].numbers[0]);

// for (let i = 0; i < persons.length; i++){
//     console.log(persons[0].numbers[0])
// }

// To print the person who has no number
console.log("\n------------------------------------\n");
for (let person of persons) {
  if (person.numbers.length === 0) {
    console.log(`${person.firstname} ${person.lastname} has no number`);
  } else {
    console.log(`${person.firstname} ${person.lastname}: ${person.numbers}`);
  }
}
