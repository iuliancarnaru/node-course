const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Bucharest", (err, data) => {
  console.log("Error:", err);
  console.log("Data:", data);

  const { long, lat } = data;

  forecast(long, lat, (err, data) => {
    console.log("Error:", err);
    console.log("Data:", data);
  });
});
