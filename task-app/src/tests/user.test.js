const request = require("supertest");
require("dotenv").config();

const app = require("../app");
const User = require("../models/User");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

// should have dedicated DB for test cases
beforeEach(setupDatabase);

test("Should signup new user", async () => {
  // sending data to endpoint
  const response = await request(app)
    .post("/users")
    .send({
      name: "Iulian",
      email: "iulian@example.com",
      password: "pass1234",
    })
    .expect(201);

  // assert the DB was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // assert about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Iulian",
      email: "iulian@example.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("pass1234");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
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

test("Should get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get user profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete user account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete user account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "src/tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update authenticated user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Aneta" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe("Aneta");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "London" })
    .expect(400);
});
