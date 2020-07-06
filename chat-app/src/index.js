const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

let count = 0;

io.on("connection", (socket) => {
  console.log("new socket connection");
  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    // socket.emit("countUpdated", count);
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log(`App up and running at http://localhost:${port}`);
});