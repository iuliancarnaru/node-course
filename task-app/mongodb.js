// Create Read Update Delete
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("mongodb");

const { MongoClient, ObjectID } = mongodb;

dotenv.config();

const uri = `mongodb+srv://iuliancarnaru:${process.env.MONGO_DB_PASSWORD}@cluster0-9wqrx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log(`Unable to connect to Mongo cluster`);
    }

    console.log(`Connected correctly to Mongo cluster`);
    const db = client.db("task-app");

    // CREATE (insertOne, insertMany)

    // READ (findOne)
    db.collection("users").findOne(
      { _id: new ObjectID("5ee5cc75027c120f302b9d4d") },
      (err, user) => {
        if (err) return console.log(`Unable to fetch user`);
        console.log(user);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((err, tasks) => {
        console.log(tasks);
      });

    db.collection("tasks")
      .find({ completed: false })
      .count((err, count) => {
        console.log(count);
      });
  }
);
