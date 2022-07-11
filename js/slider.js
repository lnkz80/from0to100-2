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
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
    // makeActiveDot(slideIndex);
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
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
    // makeActiveDot(slideIndex);
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

    sliderField.style.transform = `translateX(${offset}px)`;
  });

  //SLIDER DOTS
  const slider = document.querySelector(".offer__slider"),
    dotsWrapper = document.querySelector(".offer__slider-dots");

  //VER.2
  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  const dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = "1";
    });
  });
  //VER.1
  // const renderDots = (act = 1) => {
  //   for (let i = 1; i < slides.length + 1; i++) {
  //     const span = document.createElement("span");
  //     span.textContent = "•";
  //     if (act == i) {
  //       span.classList.add("active");
  //     } else {
  //       span.classList.remove("active");
  //     }
  //     dotsWrapper.append(span);
  //   }
  // };
  //init
  // renderDots();

  // function makeActiveDot(dotIdx) {
  //   dots.forEach((dot) => dot.classList.remove("active"));
  //   dots[dotIdx].classList.add("active");
  // }
  // //add eventListeners
  // const dots = document.querySelectorAll(".offer__slider-dots span");
  // dots.forEach((dot, idx) => {
  //   dot.addEventListener("click", function () {
  //     makeActiveDot(idx);
  //     offset = +width.slice(0, width.length - 2) * idx;
  //     slideIndex = idx + 1;
  //     current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
  //     sliderField.style.transform = `translateX(-${offset}px)`;
  //   });
  // });
});
