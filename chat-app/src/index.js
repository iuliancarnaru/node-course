const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

const message = `Welcome`;

io.on("connection", (socket) => {
  socket.emit("message", message);
  socket.broadcast.emit("message", "A new user has joined the chat");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user had left");
  });
});

server.listen(port, () => {
  console.log(`App up and running at http://localhost:${port}`);
});
