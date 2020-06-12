console.log("Client side JS is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
