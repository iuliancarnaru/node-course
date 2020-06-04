const validator = require('validator');
const add = require('./utils.js');
const notes = require('./notes.js');

const sum = add(3, 4);

console.log(sum);
console.log(notes());

console.log(validator.isEmail('test@example.com'));
console.log(validator.isURL('http://www.example.com'));
