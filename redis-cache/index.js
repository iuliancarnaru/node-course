const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
const setResponse = (username, public_repos) => {
  return `<h2>${username} has ${public_repos} repositories</h2>`;
};

// make request to github for data
const getRepos = async (req, res, next) => {
  try {
    console.log(`Fetching data...`);
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    const { public_repos } = data;

    // set data to redis
    client.setex(username, 3600, public_repos);

    res.send(setResponse(username, public_repos));
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Cache middleware
const cache = (req, res, next) => {
  const { username } = req.params;
  client.get(username, (err, data) => {
    if (err) {
      throw new Error(err);
    }

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
};

app.get("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
