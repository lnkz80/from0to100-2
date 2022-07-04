"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 1,
    offset = 0;
  const current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    slides = document.querySelectorAll(".offer__slide"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(sliderWrapper).width,
    sliderField = document.querySelector(".offer__slider-inner");

  sliderField.style.width = 100 * slides.length + "%";
  sliderField.style.display = "flex";
  sliderField.style.transition = "0.5s all";

  sliderWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  // console.log(+width.slice(0, width.length - 2) * (slides.length - 1));

  next.addEventListener("click", () => {
    if (offset == -width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    sliderField.style.transform = `translateX(${offset}px)`;
  });
});
