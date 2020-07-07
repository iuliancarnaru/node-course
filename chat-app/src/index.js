const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

const message = `Welcome`;

io.on("connection", (socket) => {
  socket.emit("message", message);
  socket.broadcast.emit("message", "A new user has joined the chat");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    io.emit("message", `https://google.com/maps?q=${latitude},${longitude}`);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user had left");
  });
});

server.listen(port, () => {
  console.log(`App up and running at http://localhost:${port}`);
});
