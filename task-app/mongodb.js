// Create Read Update Delete
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

dotenv.config(path.join(__dirname, ".env"));

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

    // db.collection("users").insertOne(
    //   { name: "Iulian Carnaru", age: 35 },
    //   (err, result) => {
    //     if (err) {
    //       console.log(`Unable to insert user`);
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     { name: "Aneta", age: 28 },
    //     { name: "Mari", age: 27 },
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       console.log(`Unable to insert users`);
    //     }
    //     console.log(result.ops);
    //   }
    // );

    db.collection("tasks").insertMany(
      [
        {
          description: "Clean house",
          completed: false,
        },
        {
          description: "Do exercises",
          completed: true,
        },
        {
          description: "Clean dishes",
          completed: false,
        },
      ],
      (err, result) => {
        if (err) {
          console.log(`Unable to insert tasks`);
        }

        console.log(result.ops);
      }
    );
  }
);
