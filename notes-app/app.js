const validator = require('validator');
const chalk = require('chalk');
const add = require('./utils.js');
const notes = require('./notes.js');

const sum = add(3, 4);

console.log(sum);
console.log(notes());

console.log(validator.isEmail('test@example.com'));
console.log(validator.isURL('http://www.example.com'));

console.log(chalk.green.bold('Success'));
console.log(chalk.red.bold('Error'));
console.log(chalk.bgBlue.bold('Loading'));

console.log(chalk`There are {yellow.bold 5280 feet} in a mile`);
