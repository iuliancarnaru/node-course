const superagent = require("superagent");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query="London"`;

superagent.get(url).end((err, res) => {
  const data = JSON.parse(res.text);
  console.log(data);
});
