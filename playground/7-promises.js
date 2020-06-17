const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3, 4, 5]);
    // reject(new Error(`Unable to get data`));
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log("Success", result);
  })
  .catch((err) => {
    console.log(err.message);
  });
