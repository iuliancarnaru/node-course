const superagent = require("superagent");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query="${long},${lat}"`;
  superagent.get(url).end((err, res) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (res.body.error) {
      callback("Unable to find to location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = res.body.current;
      callback(
        undefined,
        `Today is ${weather_descriptions[0].toLowerCase()}. Currently ${temperature} degrees outside. It feelslike ${feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
