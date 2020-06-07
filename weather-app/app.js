const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2].split("=")[1];

if (location) {
  geocode(location, (err, geolocationData) => {
    if (err) {
      return console.log(err);
    }

    forecast(geolocationData.long, geolocationData.lat, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }

      console.log(chalk.green.inverse(geolocationData.location));
      console.log(forecastData);
    });
  });
} else {
  console.log(chalk.red.inverse("Please provide an address"));
}
