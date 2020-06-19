const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject(new Error("Please add only positive numbers"));
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  // return "Iulian";
  // throw new Error("No data available");

  const sum = await add(1, 22);
  const sum2 = await add(sum, -3);
  return sum2;
};

doWork()
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
