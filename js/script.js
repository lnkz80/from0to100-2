/* Задания на урок 030:
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Одержимость",
        "Ла-ла лэнд",
        "Скотт Пилигрим против...",
        "Лига справедливости"
    ]
};

// ====== 030 ======

const formAdd = document.querySelector(".add"),
    formAddInput = document.querySelector(".adding__input"),
    favFilm = formAdd.querySelector("input[type=checkbox]");

formAdd.lastElementChild.addEventListener("click", (e) => {
    e.preventDefault();
    let filmInput = formAddInput.value;

    if (filmInput != "") {
        if (filmInput.length > 21) {
            const filmInputArr = filmInput.split("");
            filmInputArr.splice(21, filmInput.length - 21, "...");
            filmInput = filmInputArr.join("");
        }
        if (favFilm.checked) {
            console.log("Добавляем любимый фильм");
            favFilm.checked = false;
        }
        movieDB.movies.push(filmInput);
        watchedFilmsListRender();
        addDelEvent();
        formAddInput.value = "";
    } else {
        alert("Поле пустое - введите название фильма");
    }
});




const advImg = document.querySelectorAll(".promo__adv img"),
    poster = document.querySelector(".promo__bg"),
    genre = poster.querySelector(".promo__genre"),
    iUL = document.querySelector(".promo__interactive-list");

//==== 1 ====
advImg.forEach(item => item.remove());

//==== 2 ====
genre.textContent = "ДРАМА";

//==== 3 ====
poster.style.backgroundImage = "url('./img/bg.jpg')";

//==== 4,5 ====


function watchedFilmsListRender() {
    iUL.innerHTML = "";
    movieDB.movies.sort().map((item, key) => {
        iUL.innerHTML += `
        <li class="promo__interactive-item">${++key}. ${item}
            <div class="delete"></div>
        </li>`;
    });
}

function addDelEvent() {
    const delBtns = document.querySelectorAll(".delete");
    delBtns.forEach((btn, key) => {
        btn.addEventListener("click", () => {
            delete movieDB.movies[key];
            watchedFilmsListRender();
            addDelEvent();
        });
    });
}
watchedFilmsListRender();
addDelEvent();