"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    imgs = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next");
  let idx = 1;

  //Init
  showSlides(idx);
  total.textContent = imgs.length < 10 ? `0${imgs.length}` : imgs.length;

  function hideImgs() {
    imgs.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
  }

  function showImgs(el = idx - 1) {
    imgs[el].classList.remove("hide");
    imgs[el].classList.add("show", "fade");
  }

  function showSlides(i) {
    if (idx < 1) {
      idx = imgs.length;
    } else if (idx > imgs.length) {
      idx = 1;
    }
    hideImgs();
    showImgs(idx - 1);
    current.textContent = idx < 10 ? `0${idx}` : idx;
  }

  function plusSlides(n) {
    showSlides((idx += n));
  }

  prev.addEventListener("click", () => plusSlides(-1));
  next.addEventListener("click", () => plusSlides(1));
});
