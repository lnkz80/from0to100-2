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

  const deadLine = "2022-06-22";

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

  const DB = [
    {
      header: 'Меню "Фитнес"',
      text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      price: 229,
      img: "img/tabs/vegy.jpg",
      alt: "vegy",
    },
    {
      header: "Меню “Премиум”",
      text: "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
      price: 550,
      img: "img/tabs/elite.jpg",
      alt: "elite",
    },
    {
      header: 'Меню "Постное"',
      text: "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
      price: 430,
      img: "img/tabs/post.jpg",
      alt: "post",
    },
  ];

  class Card {
    constructor(img, alt, header, text, price, parentDiv) {
      this.img = img;
      this.alt = alt;
      this.header = header;
      this.text = text;
      this.price = price;
      this.parentDiv = document.querySelector(parentDiv);
    }

    render() {
      const elem = document.createElement("div");
      elem.classList.add("menu__item");
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

  DB.forEach((item) => {
    new Card(
      item.img,
      item.alt,
      item.header,
      item.text,
      item.price,
      ".menu .container"
    ).render();
  });
});
