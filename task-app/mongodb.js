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
    // READ (findOne, find(toArray, count))
    // UPDATE (updateOne($set), updateMany)
    // DELETE (deleteOne, deleteMany)

    db.collection("users")
      .deleteOne({ name: "Mari" })
      .then((result) => {
        console.log(result.deletedCount);
      })
      .catch((err) => console.log(err));
  }
);
