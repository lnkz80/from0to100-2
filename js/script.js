"use strict";

document.addEventListener("DOMContentLoaded", () => {
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
});
