const superagent = require("superagent");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`;

  superagent.get(url).end((err, res) => {
    if (err) {
      callback("Unable to connect to location services...", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another location!", undefined);
    } else {
      callback(undefined, {
        long: res.body.features[0].center[0],
        lat: res.body.features[0].center[1],
        location: res.body.features[0].place_name.split(",")[0],
      });
    }
  });
};

module.exports = geocode;
