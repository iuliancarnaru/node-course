setTimeout(() => {
  console.log(`Two seconds are passed`);
}, 2000);

const names = ["Andrew", "Jen", "Jess"];
const shortNames = names.filter((name) => name.length <= 4);

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      lat: 0,
      long: 0,
    };

    callback(data);
  }, 2000);
};

geocode("London", (data) => {
  console.log(data);
});

// CHALLENGE

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(sum);
});
