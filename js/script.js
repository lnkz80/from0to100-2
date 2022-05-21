"use strict";
/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"
*/

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function (){
        this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while(this.count == '' || this.count == null || isNaN(this.count)){
            this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: function() {
        for (let i = 0; i < 2; i++){
            const film = prompt('Один из последних просмотренных фильмов?', '');
            const rate = prompt('На сколько оцените его?', '');
            if (film != null && rate != null && film!="" && rate != "" && film.length < 50){
                this.movies[film] = rate;
            } else {
                i--;
            }    
        }
    },
    detectPersonalLevel: function(){
        if (this.count < 10) {
            alert("Просмотрено довольно мало фильмов");
        } else if (this.count >=10 && this.count < 30){
            alert("Вы классический зритель");
        }  else if (this.count >= 30){
            alert("Вы киноман");
        } else {alert("Произошла ошибка");}
    },
    writeYourGenres: function(){
        for (let i = 0; i < 3; i++){
            const userGenre = prompt(`Ваш любимый жанр под номером ${i + 1}`, "");
            if (userGenre != null && userGenre != ""){
                this.genres[i] = userGenre;
            } else {
                i--;
                alert("Поле пустое или Вы нажали отмену...");
            }
        }
    },
    showMyDB: function(){
        this.privat ? console.log("===> privat is true") : console.log(personalMovieDB)
    },
    toggleVisibleMyDB: function(){
        this.privat = !this.privat;
    },
};


// personalMovieDB.start();
// personalMovieDB.detectPersonalLevel();
// personalMovieDB.rememberMyFilms();
// personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB();

// console.log(personalMovieDB);
