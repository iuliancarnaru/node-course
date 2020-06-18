const express = require("express");
require("./db/mongoose");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
});

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.send(task))
    .catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
