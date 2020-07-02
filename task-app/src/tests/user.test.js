const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const userOne = {
  name: "John Doe",
  email: "john@example.com",
  password: "john1234",
};

// should have dedicated DB for test cases
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup new user", async () => {
  // sending data to endpoint
  await request(app)
    .post("/users")
    .send({
      name: "Iulian",
      email: "iulian@example.com",
      password: "pass1234",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "doe@example.com",
      password: "doe1234",
    })
    .expect(400);
});
