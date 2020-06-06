const fs = require("fs");

// 1. Write the data to the file
const book = {
  title: "Ego is the enemy",
  author: "Ryan Holyday",
};

const booksJSON = JSON.stringify(book, null, 2);
fs.writeFileSync("1-json.json", booksJSON);

// 2. Read the data from the file
const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.title);
