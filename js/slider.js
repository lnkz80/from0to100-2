"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const current = document.querySelector("#curent");
  const total = document.querySelector("#total");
  const imgs = document.querySelectorAll(".offer__slide");

  const hideImgs = () => {
    imgs.forEach((item) => {
      item.classList.add("hide");
    });
  };

  const showImgs = (el = 0) => {
    imgs[el].classList.remove("hide");
    imgs[el].classList.add("show");
  };

  hideImgs();
  showImgs();

  //   img.src = "img/slider/olive-oil.jpg";
  //   const sliderImages = [
  //     { src: "food-12.jpg", alt: "food" },
  //     { src: "olive-oil.jpg", alt: "oil" },
  //     { src: "pepper.jpg", alt: "pepper" },
  //     { src: "paprika.jpg", alt: "paprika" },
  //   ];
  let idx = 0;

  function showPicture(i) {}
});
