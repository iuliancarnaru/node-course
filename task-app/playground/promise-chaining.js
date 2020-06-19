require("../src/db/mongoose");
const User = require("../src/models/User");

// PROMISE CHAINING
// User.findByIdAndUpdate("5eeb5b81d6569a1c1bdcfbbf", {
//   age: 28,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5eeb5b81d6569a1c1bdcfbbf", 29)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => console.log(err.message));
