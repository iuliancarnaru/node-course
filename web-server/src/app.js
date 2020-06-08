const path = require("path");
const express = require("express");

const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.use(express.static(publicDirectory));

app.set("view engine", "pug");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  res.render("homepage", {
    title: "Weather App",
    name: "Iulian Carnaru",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "London",
    forecast: "It is cloudy",
  });
});

// help page 404 (not found)
app.get("/help/*", (req, res) => {
  res.render("not-found", {
    title: "404",
    message: "Help articles not found...",
  });
});

// generic 404 (not found)
app.get("*", (req, res) => {
  res.render("not-found", {
    title: "404",
    message: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is runnging, visit on http://localhost:3000");
});
