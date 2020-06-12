console.log("Client side JS is loaded");

fetch(`http://localhost:3000/weather?address="bucharest"`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
