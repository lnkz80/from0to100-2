"use strict";
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

  tabs();
  modal("[data-modal]", ".modal");
  timer();
  cards();
  calc();
  forms();
  slider();
  // test();
});
