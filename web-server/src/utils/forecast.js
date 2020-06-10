const superagent = require("superagent");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query="${lat},${long}"`;
  superagent.get(url).end((err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find to location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(
        undefined,
        `Today is ${weather_descriptions[0].toLowerCase()}. Currently ${temperature} degrees outside. It feelslike ${feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
