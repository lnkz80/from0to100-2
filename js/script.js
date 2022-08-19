"use strict";
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import { openModal } from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";
import test from "./modules/test";

document.addEventListener("DOMContentLoaded", () => {
  // ==== CommonJS import
  // const tabs = require("./modules/tabs"),
  //   modal = require("./modules/modal"),
  //   timer = require("./modules/timer"),
  //   cards = require("./modules/cards"),
  //   calc = require("./modules/calc"),
  //   forms = require("./modules/forms"),
  //   slider = require("./modules/slider"),
  //   test = require("./modules/test");

  //show modal after 3s
  const modalIntervalId = setTimeout(
    () => openModal(".modal", modalIntervalId),
    3000
  );

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalIntervalId);
  timer(".timer", "2022-09-22");
  cards();
  calc();
  forms("form", ".modal", modalIntervalId);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    previousArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  // test();
});
