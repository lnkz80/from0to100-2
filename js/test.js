"use strict";

//PROMISES

const req = new Promise((resolve, reject) => {
  console.log("Start getting DATA...");
  const product = {
    name: "Phone",
    brand: "Apple",
    model: "Iphone 12",
  };
  setTimeout(() => {
    console.log(`${product.name}: ${product.brand} ${product.model}`);
    resolve(product);
  }, 2000);
});

req
  .then((product) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = "ordered";
        resolve(product);
        reject("Something went wrong");
      }, 2000);
    });
  })
  .then((data) => {
    data.modify = true;
    return data;
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
