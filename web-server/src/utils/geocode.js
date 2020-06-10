const superagent = require("superagent");

const geocode = (address, callback) => {

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`;

  superagent.get(url).end((err, { body }) => {
    if (err) {
      callback("Unable to connect to location services...", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another location!", undefined);
    } else {
      callback(undefined, {
        long: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name.split(",")[0],
      });
    }
  });
};

module.exports = geocode;
