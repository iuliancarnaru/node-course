const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Task = require("../../models/Task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "John Doe",
  email: "john@example.com",
  password: "john1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Jane Doe",
  email: "jane@example.com",
  password: "jane1234",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Finish Node tutorial",
  completed: true,
  createdBy: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Start Typescript tutorial",
  completed: false,
  createdBy: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Finish Deno tutorial",
  completed: false,
  createdBy: userTwoId,
};

const setupDatabase = async () => {
  // cleaning existing database
  await User.deleteMany();
  await Task.deleteMany();

  // create and save the users
  await new User(userOne).save();
  await new User(userTwo).save();

  // create and save the tasks
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
