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

document.addEventListener("DOMContentLoaded", () => {

    const movieDB = {
        movies: [
            "Логан",            
            "Ла-ла лэнд",
            "Скотт Пилигрим против...",
            "Одержимость",
            "Лига справедливости"
        ]
    };
    
    const formAdd = document.querySelector("form.add"),
        formAddInput = formAdd.querySelector(".adding__input"),
        favFilm = formAdd.querySelector("[type=checkbox]"),
        advImg = document.querySelectorAll(".promo__adv img"),
        poster = document.querySelector(".promo__bg"),
        genre = poster.querySelector(".promo__genre"),
        iUL = document.querySelector(".promo__interactive-list");
    
    const advRemove = (adv) => {
        adv.forEach(item => item.remove());
    };
        
    const addChanges = () => {
        genre.textContent = "ДРАМА";            
        poster.style.backgroundImage = "url('./img/bg.jpg')";
    };

    const sortList = (arr) => {
        arr.sort();
    };  
    

    const watchedFilmsListRender = (filmList, parentObj) => {
        iUL.innerHTML = "";        
        filmList.forEach((item, key) => {
            parentObj.innerHTML += `
            <li class="promo__interactive-item">${++key}. ${item}
                <div class="delete"></div>
            </li>`;            
        });
        document.querySelectorAll(".delete").forEach((delBtn, numBtn) => {
            delBtn.addEventListener("click", (e)=>{                
                e.target.parentNode.remove();
                movieDB.movies.splice(numBtn, 1);
                watchedFilmsListRender(filmList, parentObj);        
            });
        });        
    };

    formAdd.addEventListener("submit", (e) => {
        e.preventDefault();
        let filmInput = formAddInput.value;
        if (filmInput) {
            if (filmInput.length > 21) {    
                filmInput = `${filmInput.substring(0, 22)}...`;
            }
            if (favFilm.checked) {
                console.log("Добавляем любимый фильм");         
            }
            movieDB.movies.push(filmInput);
            sortList(movieDB.movies);
            watchedFilmsListRender(movieDB.movies, iUL);
            // addDelEvent();            
            //очистка формы
            e.target.reset();
        } else {
            alert("Поле пустое - введите название фильма");
        }
    });
    

    advRemove(advImg);
    addChanges();
    sortList(movieDB.movies);
    watchedFilmsListRender(movieDB.movies, iUL);    

});