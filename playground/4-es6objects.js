// Object property shorthand

const name = "Iulian";
const userAge = 35;

const user = {
  name,
  age: userAge,
  location: "London",
};

console.log(user);

// Object destructuring

const product = {
  label: "Red notebook",
  price: 100,
  stock: 20,
  salePrice: undefined,
};

// const label = product.label;
// const price = product.price;

const { label, price } = user;

// Destructuring parameters

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
transaction("order"); // Cannot destructure property 'label' of undefined

// we have to provide a default parameter when object is not provided
const transaction2 = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
};
