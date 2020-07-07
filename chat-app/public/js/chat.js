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

document.querySelector("#send-location").addEventListener("click", (event) => {
  if (!navigator.geolocation) {
    return alert("Geolocation not suported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude });
  });
});
