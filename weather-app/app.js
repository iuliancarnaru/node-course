const superagent = require("superagent");
const chalk = require("chalk");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const weather_url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query="London"`;
const mapbox_geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`;

superagent
  .get(mapbox_geocode_url)
  .set("accept", "json")
  .end((err, res) => {
    if (err) {
      console.log(chalk.red.inverse("Unable to connect to location services"));
    } else if (res.body.features.length === 0) {
      console.log(
        chalk.red.inverse(
          "Unable to find location, try again with different search term"
        )
      );
    } else {
      const [long, lat] = res.body.features[0].center;
      console.log(long, lat);
    }
  });

superagent
  .get(weather_url)
  .set("accept", "json")
  .end((err, res) => {
    if (err) {
      console.log(chalk.red.inverse("Unable to connect to weather service"));
    } else if (res.body.error) {
      console.log(chalk.red.inverse("Unable to find to location"));
    } else {
      const { temperature, feelslike, weather_descriptions } = res.body.current;
      console.log(
        `Today is ${weather_descriptions[0].toLowerCase()}. Currently ${temperature} degrees outside. It feelslike ${feelslike} degrees.`
      );
    }
  });
