const path = require("path");
const express = require("express");

const app = express();
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("/weather", (req, res) => {
  res.send({
    location: "London",
    forecast: "It is cloudy",
  });
});

app.listen(3000, () => {
  console.log("Server is runnging, visit on http://localhost:3000");
});
