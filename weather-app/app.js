const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2].split("=")[1];

if (location) {
  geocode(location, (err, { long, lat, location } = {}) => {
    if (err) {
      return console.log(err);
    }

    forecast(long, lat, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }

      console.log(chalk.green.inverse(location));
      console.log(forecastData);
    });
  });
} else {
  console.log(chalk.red.inverse("Please provide an address"));
}
