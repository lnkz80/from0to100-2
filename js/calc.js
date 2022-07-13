"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //variables declaration
  const result = document.querySelector(".calculating__result span"),
    calcWrapper = document.querySelector(".calculating");
  let sex = "female",
    height,
    weight,
    age,
    ratio = 1.375;
  //
  function calcTotal() {
    let res;
    console.log(sex, height, weight, age, ratio);
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }
    if (sex === "female") {
      res = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
    } else {
      res = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
    }
    // result.textContent = Math.round(res);
    result.textContent = res.toFixed();
  }

  function getStaticInfo(action, parent) {
    document.querySelector(`#${parent}`).addEventListener(action, (e) => {
      const elem = e.target;
      if (elem && elem.matches(".calculating__choose-item")) {
        if (parent != "constitution") {
          makeElActive(elem, "calculating__choose-item_active", parent);
        }
        if (parent === "gender") {
          sex = elem.dataset.sex;
        }
      }
      if (parent === "activity") {
        ratio = +elem.dataset.ratio;
      }
      if (parent === "constitution") {
        if (elem.id === "height") {
          height = +elem.value;
        }
        if (elem.id === "weight") {
          weight = +elem.value;
        }
        if (elem.id === "age") {
          age = +elem.value;
        }
      }
      calcTotal();
    });
  }

  function makeElActive(el, actClass, parent) {
    document
      .querySelectorAll(`#${parent} div`)
      .forEach((item) => item.classList.remove(actClass));
    el.classList.add(actClass);
  }

  // eventListener
  getStaticInfo("click", "gender");
  getStaticInfo("input", "constitution");
  getStaticInfo("click", "activity");
});
