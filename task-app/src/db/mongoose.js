const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`${process.env.MONGO_CLUSTER}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => `Connected to Mongo Cluster...`);
