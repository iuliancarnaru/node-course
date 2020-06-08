const http = require("http");

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query="London"`;

const request = http.request(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data = data + chunk;
  });

  res.on("end", () => {
    const body = JSON.parse(data);
  });
});

request.on("error", (err) => {
  console.log("Upps, an error occurred", err);
});

request.end();
