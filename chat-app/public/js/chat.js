const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("The count has been updated", count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("Clicked");
//   socket.emit("increment");
// });

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;

  socket.emit("sendMessage", message);
});
