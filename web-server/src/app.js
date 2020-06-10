const path = require("path");
const express = require("express");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

console.log(process.env);

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
  if (!req.query.address) {
    return res.send({
      error: "Please provide a valid address",
    });
  }

  geocode(req.query.address, (err, { long, lat, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }

    forecast(long, lat, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }

      console.log(forecastData);

      res.send({
        ...forecastData,
      });
    });
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
