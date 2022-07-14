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

  function checkNum(num, field) {
    const warnfield = document.querySelector("#warn");
    if (warnfield) {
      // document.querySelector("#warn").remove();
      console.log("111");
    }
    const regX = /\D/g;
    if (regX.test(num)) {
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
      warn.id = "warn";
      document.body.prepend(warn);
      warn.style.left = coords.left + window.pageXOffset + "px";
      warn.style.top = -25 + coords.top + window.pageYOffset + "px";
      document.body.append(warn);
      // setTimeout(() => {
      //   warn.remove();
      //   field.value = "";
      // }, 2000);
      return;
    } else {



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
        // height = +document.querySelector("#height").value;
        height = checkNum(+document.querySelector("#height").value, elem);
        weight = checkNum(+document.querySelector("#weight").value, elem);
        age = checkNum(+document.querySelector("#age").value, elem);

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