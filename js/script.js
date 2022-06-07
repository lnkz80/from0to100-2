"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //TABS

    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = tabsParent.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent");

    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
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

    tabsParent.addEventListener("click", e => {
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
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    };

    const getZero = num => {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

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

    // MODAL

    const modalBtns = document.querySelectorAll('[data-modal]'),
        closeBtn = document.querySelector("[data-close]"),
        modalWindow = document.querySelector(".modal");
    //1 var  
    const closeModal = () => {
        modalWindow.classList.toggle("show");
        document.body.style.overflow = "";
    };

    modalBtns.forEach(item => {
        item.addEventListener("click", () => {
            modalWindow.classList.toggle("show");
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", closeModal);

    modalWindow.addEventListener("click", (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    }); 


});