const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// PROMISE CHAINING (return promise)
add(1, 3)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((err) => console.log(err));

// add(1, 2)
//   .then((sum) => {
//     add(sum, 7)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));
