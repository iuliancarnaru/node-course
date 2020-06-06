const square = function (x) {
  return x * x;
};

const squareArrow = (x) => {
  return x * x;
};

const squareArrowTwo = (x) => x * x;

const event = {
  name: "Birthday Party",
  printGuestList: function () {
    console.log(`Guest list for ${this.name}`);
  },
};

const eventTwo = {
  name: "Birthday Party",
  printGuestList: () => {
    // arrow functions don't bind their own this value (name is undefined)
    console.log(`Guest list for ${this.name}`);
  },
};

const eventThree = {
  name: "Birthday Party",
  // method printGuestList on object eventThree
  guestList: ["Iulian", "Paul", "Aneta"],
  printGuestList() {
    console.log(`Guest list for ${this.name}`);
    this.guestList.forEach((guest) => {
      // this binding of the arrow function is to the printGuestList
      // and is having access to the this of the object
      console.log(`${guest} is attending ${this.name}`);
    });
  },
};

// CHALLENGE SECTION

const tasks = {
  tasks: [
    {
      text: "Grocery shopping",
      completed: true,
    },
    {
      text: "Clean yard",
      completed: false,
    },
    {
      text: "Film course",
      completed: false,
    },
  ],
  getTasksToDo() {
    return this.tasks.filter((task) => task.completed !== true);
  },
};

console.log(tasks.getTasksToDo());
