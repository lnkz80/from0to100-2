/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
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
    // console.log(sex, params.height, params.weight, params.age, ratio);
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
        text-align: center;       
        z-index: 55`;
      warn.textContent = "Please, enter a number!!!";
      warn.style.width = field.offsetWidth + "px";
      warn.id = "warn_" + field.id;
      document.body.prepend(warn);
      warn.style.left = coords.left + window.pageXOffset + "px";
      warn.style.top =
        -field.offsetHeight / 2 + coords.top + window.pageYOffset + "px";
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  //CARDS "MENU"

  // OLD USE DB WITHOUT JSON
  //   const DB = [
  //     {
  //       header: 'Меню "Фитнес"',
  //       text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //       price: 229,
  //       img: "img/tabs/vegy.jpg",
  //       alt: "vegy",
  //     },
  //     {
  //       header: "Меню “Премиум”",
  //       text: "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  //       price: 550,
  //       img: "img/tabs/elite.jpg",
  //       alt: "elite",
  //     },
  //     {
  //       header: 'Меню "Постное"',
  //       text: "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  //       price: 430,
  //       img: "img/tabs/post.jpg",
  //       alt: "post",
  //     },
  //   ];

  const getResource = async (url) => {
    const res = await fetch(url);
    //check for errors in fetch
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  class Card {
    constructor(img, alt, header, text, price, parentDiv, ...classes) {
      this.img = img;
      this.alt = alt;
      this.header = header;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.parentDiv = document.querySelector(parentDiv);
      this.currency = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.currency;
    }

    render() {
      const elem = document.createElement("div");
      if (this.classes.length === 0) {
        elem.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => elem.classList.add(className));
      }
      this.parentDiv.append(elem);
      elem.innerHTML += `<img src=${this.img} alt="${this.alt}">
                  <h3 class="menu__item-subtitle">${this.header}</h3>
                  <div class="menu__item-descr">${this.text}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Цена:</div>
                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>`;
    }
  }

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    });
  });

  // OLD USE DB WITHOUT JSON
  // DB.forEach((item) => {
  //     new Card(
  //         item.img,
  //         item.alt,
  //         item.header,
  //         item.text,
  //         item.price,
  //         ".menu .container"
  //     ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");

function forms(modalSelector, modalIntervalId) {
  //POST FormData & JSON

  const forms = document.querySelectorAll("form");
  const mess = {
    loading: "img/forms/spinner.svg",
    success: "Дякуємо, зв'жемося з Вами у найближчий час",
    failure: "Щось пішло не так :(",
  };

  forms.forEach((item) => bindPostData(item));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = mess.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      //put form values to object  - 1 variant
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });

      //convert formData into JSON - 2nd BEST variant
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //USE FETCH
      // postData("http://localhost:3000/requests", JSON.stringify(obj))
      postData("http://localhost:3000/requests", json)
        .then((req) => {
          console.log(req);
          showMessage(mess.success);
          statusMessage.remove();
        })
        .catch(() => {
          showMessage(mess.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showMessage(message) {
    const modalContent = document.querySelector(".modal__dialog");
    modalContent.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalIntervalId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalContent.classList.add("show");
      modalContent.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector, modalIntervalId);
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalIntervalId) {
  // modalWindow.classList.toggle("show");

  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalIntervalId) {
    clearInterval(modalIntervalId);
  }
}

const closeModal = (modalSelector) => {
  // modalWindow.classList.toggle("show");
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("hide");
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
};

function modal(triggerSelector, modalSelector) {
  // MODAL

  const modalBtns = document.querySelectorAll(triggerSelector),
    closeBtn = document.querySelector("[data-close]"),
    modalWindow = document.querySelector(modalSelector);
  //1 var

  modalBtns.forEach((item) => {
    item.addEventListener("click", () => openModal(modalSelector));
  });

  closeBtn.addEventListener("click", () => closeModal(modalSelector));

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  //close modal by pressing "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  //show modal at the end of page
  const modalScrollOpen = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector);
      window.removeEventListener("scroll", modalScrollOpen);
    }
  };

  window.addEventListener("scroll", modalScrollOpen);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
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

  const delPX = (str) => +str.replace(/\D/g, "");

  next.addEventListener("click", () => {
    if (offset == delPX(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += delPX(width);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // makeActiveDot(slideIndex);
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
    sliderField.style.transform = `translateX(-${offset}px)`;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = delPX(width) * (slides.length - 1);
    } else {
      offset -= delPX(width);
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
    sliderField.style.transform = `translateX(-${offset}px)`;
  });

  //SLIDER DOTS
  const slider = document.querySelector(".offer__slider");

  //VER.1
  // dotsWrapper = document.querySelector(".offer__slider-dots");

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
      offset = delPX(width) * (slideTo - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = "1";
      current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  //TABS

  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = tabsParent.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (elem = 0) => {
    tabsContent[elem].classList.add("show", "fade");
    tabsContent[elem].classList.remove("hide");
    tabs[elem].classList.add("tabheader__item_active");
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const tab = e.target;
    if (tab && tab.classList.contains("tabheader__item")) {
      tabs.forEach((item, num) => {
        if (item == tab) {
          hideTabContent();
          showTabContent(num);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/test.js":
/*!****************************!*\
  !*** ./js/modules/test.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function test() {
  //PROMISES

  const req = new Promise((resolve, reject) => {
    console.log("Start getting DATA...");
    const product = {
      name: "Phone",
      brand: "Apple",
      model: "Iphone 12",
    };
    setTimeout(() => {
      console.log(`${product.name}: ${product.brand} ${product.model}`);
      resolve(product);
    }, 2000);
  });

  req
    .then((product) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          product.status = "ordered";
          resolve(product);
          reject("Something went wrong");
        }, 2000);
      });
    })
    .then((data) => {
      data.modify = true;
      return data;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (test);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  //TIMER

  const deadLine = "2022-09-22";

  const parseDate = (endDate) => {
    const t = Date.parse(endDate) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const setDeadlineToHTML = (selector, dateValue) => {
    const dateDiv = document.querySelector(selector),
      days = dateDiv.querySelector("#days"),
      hours = dateDiv.querySelector("#hours"),
      minutes = dateDiv.querySelector("#minutes"),
      seconds = dateDiv.querySelector("#seconds"),
      timeInt = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = parseDate(dateValue);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInt);
      }
    }
  };

  setDeadlineToHTML(".timer", deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_test__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/test */ "./js/modules/test.js");











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
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalIntervalId),
    3000
  );

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(".modal", modalIntervalId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
  // test();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map