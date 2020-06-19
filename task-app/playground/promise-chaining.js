require("../src/db/mongoose");
const User = require("../src/models/User");

User.findByIdAndUpdate("5eeb5b81d6569a1c1bdcfbbf", {
  age: 28,
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 0 });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
