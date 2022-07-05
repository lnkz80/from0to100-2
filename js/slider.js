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

  total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
  current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

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

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    console.log(slideIndex);
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

    sliderField.style.transform = `translateX(${offset}px)`;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = -width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

    sliderField.style.transform = `translateX(${offset}px)`;
  });

  //SLIDER DOTS
  const slider = document.querySelector(".offer__slider"),
    dotsWrapper = document.querySelector(".offer__slider-dots");

  const renderDots = (act = 1) => {
    for (let i = 1; i < slides.length + 1; i++) {
      const span = document.createElement("span");
      span.textContent = "•";

      act == i ? span.classList.add("active") : span.classList.remove("active");

      dotsWrapper.append(span);
    }
  };
  //init
  renderDots();
  //console.log();
  console.log(
    `ZERO offset: ${offset};  index: ${slideIndex}; width: ${width.slice(
      0,
      width.length - 2
    )}`
  );
  //add eventListeners
  const dots = document.querySelectorAll(".offer__slider-dots span");
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", function () {
      dots.forEach((dot) => dot.classList.remove("active"));
      this.classList.add("active");
      console.log(idx + 1);
      if (idx + 1 > slideIndex) {
        offset -= width.slice(0, width.length - 2) * (idx + 1 - slideIndex);
        slideIndex++;
      } else {
        offset += width.slice(0, width.length - 2) * (slideIndex - idx + 1);
        slideIndex--;
      }

      console.log(`offset: ${offset};  index: ${slideIndex}`);
      sliderField.style.transform = `translateX(${offset}px)`;
    });
  });
});
