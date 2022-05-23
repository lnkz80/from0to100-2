/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

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
iUL.innerHTML = "";

movieDB.movies.sort().map((item, key) => {
    iUL.innerHTML += `
    <li class="promo__interactive-item">${++key}. ${item}
        <div class="delete"></div>
    </li>`;
});