// no default params
const greeter = (name) => {
  console.log(`Hello ${name}`);
};

// with default params
const greeter2 = (name = "Anonymous") => {
  console.log(`Hello ${name}`);
};

greeter("Iulian"); // Hello Iulian
greeter(); // Hello undefined

greeter2("Iulian"); // Hello Iulian
greeter2(); // Hello Anonymous
