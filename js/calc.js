"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //variables declaration
  const result = document.querySelector(".calculating__result span"),
    constWrapper = document.querySelector("#constitution");
  let sex = "female",
    ratio = 1.375;
  const params = {
    height: 0,
    weight: 0,
    age: 0,
  };

  //
  function calcTotal() {
    let res;
    console.log(sex, params.height, params.weight, params.age, ratio);
    if (!sex || !params.height || !params.weight || !params.age || !ratio) {
      result.textContent = "____";
      return;
    }
    if (sex === "female") {
      res =
        (447.6 + 9.2 * params.weight + 3.1 * params.height - 4.3 * params.age) *
        ratio;
    } else {
      res =
        (88.36 +
          13.4 * params.weight +
          4.8 * params.height -
          5.7 * params.age) *
        ratio;
    }
    result.textContent = res.toFixed();
  }

  function renderWarnWindow(field, warnfield) {
    if (!warnfield) {
      const warn = document.createElement("div");
      let coords = field.getBoundingClientRect();
      warn.style.cssText = `
          position: absolute;
          background-color: coral;
          color: #fff;
          padding: 3px;
          font-size: 12px;        
          z-index: 55`;
      warn.textContent = "Please, enter a number!!!";
      warn.style.width = field.offsetWidth + "px";
      warn.id = "warn_" + field.id;
      document.body.prepend(warn);
      warn.style.left = coords.left + window.pageXOffset + "px";
      warn.style.top = -25 + coords.top + window.pageYOffset + "px";
      document.body.append(warn);
    }
    // setTimeout(() => {
    //   warn.remove();
    //   field.value = "";
    // }, 2000);
  }

  function checkNum(num, field) {
    const warnfield = document.querySelector(`#warn_${field.id}`);
    const regX = /\D/g;
    if (regX.test(num)) {
      renderWarnWindow(field, warnfield);
      return;
    } else {
      if (warnfield) {
        warnfield.remove();
      }
      return num;
    }
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
        params[elem.id] = checkNum(
          +document.querySelector(`#${elem.id}`).value,
          elem
        );
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
