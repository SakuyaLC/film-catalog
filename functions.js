
function addFilm() {

    class Film {
        constructor(id, name, country, genre, producer, scenario, director, operator, compositor, budget, fees, age_rating, duration, date, poster) {
            this.id = id;
            this.name = name;
            this.country = country;
            this.genre = genre;
            this.producer = producer;
            this.scenario = scenario;
            this.director = director;
            this.operator = operator;
            this.compositor = compositor;
            this.budget = budget;
            this.fees = fees;
            this.age_rating = age_rating;
            this.duration = duration;
            this.date = date;
            this.poster = poster;
        }
    }

    var k = 0;

    //Check in console
    console.log(localStorage.getItem('filmsQ'));
    console.log(document.getElementsByName('name')[0].value);
    console.log(document.getElementsByName('country')[0].value);
    console.log(document.getElementsByName('genre')[0].value);
    console.log(document.getElementsByName('producer')[0].value);
    console.log(document.getElementById('scenario').value);
    console.log(document.getElementsByName('director')[0].value);
    console.log(document.getElementsByName('operator')[0].value);
    console.log(document.getElementsByName('compositor')[0].value);
    console.log(document.getElementsByName('budget')[0].value);
    console.log(document.getElementsByName('fees')[0].value);
    console.log(document.getElementsByName('age_rating')[0].value);
    console.log(document.getElementsByName('duration')[0].value);
    console.log(document.getElementsByName('date')[0].value);
    console.log(document.getElementsByName('poster')[0].value);

    var list = {
        id: localStorage.getItem('filmsQ'),
        name: document.getElementsByName('name')[0].value,
        country: document.getElementsByName('country')[0].value,
        genre: document.getElementsByName('genre')[0].value,
        producer: document.getElementsByName('producer')[0].value,
        scenario: document.getElementById('scenario').value,
        director: document.getElementsByName('director')[0].value,
        operator: document.getElementsByName('operator')[0].value,
        compositor: document.getElementsByName('compositor')[0].value,
        budget: document.getElementsByName('budget')[0].value,
        fees: document.getElementsByName('fees')[0].value,
        age_rating: document.getElementsByName('age_rating')[0].value,
        duration: document.getElementsByName('duration')[0].value,
        date: document.getElementsByName('date')[0].value,
        poster: document.getElementsByName('poster')[0].value
    }

    //Check object
    console.log(list);

    for (var key in list) { //Check for empty 
        if (list[key] === null || list[key] === " " || list[key] === '') k++;
    }
    console.log("Количество ошибок:", k);

    if (k == 0) { //If not empty then add film
        console.log('Code is working');
        film = new Film(
            list.id,
            list.name, list.country,
            list.genre, list.producer,
            list.scenario, list.director,
            list.operator, list.compositor,
            list.budget, list.fees,
            list.age_rating, list.duration,
            list.date, list.poster
        );

        localStorage.setItem(`film${list.id}`, JSON.stringify(film));
        localStorage.setItem('recentFID', localStorage.getItem('filmsQ'));
        console.log(localStorage.getItem(`film${list.id}`));

        filmsQ = Number(localStorage.getItem('filmsQ'));
        localStorage.setItem('filmsQ', ++filmsQ);

        console.log('Films quantity - ' + Number(localStorage.getItem('filmsQ') - 1));

    }

    if (k >= 1) {
        return 0;
    }
}

function quantityUpdate() {
    if (localStorage.getItem('filmsQ') == null) {
        localStorage.setItem('filmsQ', 1);
    }
}

function showRecentFilm() {

    let t = 0;

    for (i = 0; i < Number(localStorage.getItem('filmsQ')); i++) {
        if (localStorage.getItem(`film${i}`) != 0) {
            t = i;
        }
    }

    localStorage.setItem('recentFID', t);

    if (localStorage.getItem('recentFID') == null || localStorage.getItem('recentFID') == '') {
        let recentFilmData = '';
        recentFilmData += `
            <h1 id="rc">У вас пока нет никаких фильмов</h1>
        `;

        document.getElementById("recentFilm").innerHTML = recentFilmData;
        return 0;
    }

    film = JSON.parse(localStorage.getItem(`film${localStorage.getItem('recentFID')}`));
    console.log(film);

    let recentFilmData = '';
    recentFilmData = `
         
        <h1 id="rc">Последний добавленный фильм</h1>
        <br>
        <h2 id="rc">Название: ${film.name}</h2>
        <h2 id="rc">Страна: ${film.country}</h2>
        <h2 id="rc">Жанр: ${film.genre}</h2>
        <h2 id="rc">Режиссер(-ы): ${film.producer}</h2>
        <h2 id="rc">Сценарий:<br> ${film.scenario}</h2>
        <h2 id="rc">Продюсер(-ы): ${film.director}</h2>
        <h2 id="rc">Оператор: ${film.operator}</h2>
        <h2 id="rc">Композитор: ${film.compositor}</h2>
        <h2 id="rc">Бюджет: ${film.budget}</h2>
        <h2 id="rc">Сборы: ${film.fees}</h2>
        <h2 id="rc">Рейтинг возраста: ${film.age_rating}+</h2>
        <h2 id="rc">Длительность: ${film.duration} минуты</h2>
        <h2 id="rc">Дата выхода: ${film.date}</h2>
        <h2 id="rc">Постер:</h2>
        <img id="rc" src="${film.poster}" />
    `;

    document.getElementById("recentFilm").innerHTML = recentFilmData;


}

var deleteFilm = i => {
    console.log("Фильм с таким номером будет удален -", i);

    if (confirm('Вы действительно хотите удалить этот фильм?') == true) {
        localStorage.setItem(`film${i}`, 0);
    }

    window.location.reload();
}

function showFilmCollection() {

    var i = 1;
    var htmlCatalogFilms = document.getElementById("filmCollection");
    var filmData = '';

    console.log("Загружается коллекция фильмов");

    for (i; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {
            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            if (film.name != null || film.name != undefined || isNaN(film.name) != true) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

                `;

            }
            else console.log("Фильма с таким номером не существует - №", i);

        }
    }

    var html = `${filmData}`;
    htmlCatalogFilms.innerHTML = html;
}

function countryFilter() {

    var i = 1;
    var htmlCatalogFilms = document.getElementById("filmCollection");
    var filmData = '';

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {
            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && film.country == document.getElementsByName('countryFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {
            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && film.country != document.getElementsByName('countryFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    var html = `${filmData}`;
    htmlCatalogFilms.innerHTML = html;
}

function genreFilter() {

    var i = 1;
    var htmlCatalogFilms = document.getElementById("filmCollection");
    var filmData = '';

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {
            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && film.genre == document.getElementsByName('genreFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {
            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && film.genre != document.getElementsByName('genreFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    var html = `${filmData}`;
    htmlCatalogFilms.innerHTML = html;

}

function yearFilter() {

    var i = 1;
    var htmlCatalogFilms = document.getElementById("filmCollection");
    var filmData = '';
    var tdate;
    var tdigits;

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {

            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            console.log(film);

            tdate = String(film.date);
            console.log(tdate);
            tdate = tdate.split('');
            console.log(tdate[tdate.length - 4]);
            console.log(tdate[tdate.length - 3]);
            console.log(tdate[tdate.length - 2]);
            console.log(tdate[tdate.length - 1]);
            let tdigits = tdate[tdate.length - 4] + tdate[tdate.length - 3] + tdate[tdate.length - 2] + tdate[tdate.length - 1];
            console.log(tdigits);

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && tdigits == document.getElementsByName('yearFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    for (i = 1; i < Number(localStorage.getItem('filmsQ')); i++) {

        if (localStorage.getItem(`film${i}`) != 0) {

            console.log("Проход по фильму №", i);

            film = JSON.parse(localStorage.getItem(`film${i}`));

            console.log(film);

            tdate = String(film.date);
            console.log(tdate);
            tdate = tdate.split('');
            console.log(tdate[tdate.length - 4]);
            console.log(tdate[tdate.length - 3]);
            console.log(tdate[tdate.length - 2]);
            console.log(tdate[tdate.length - 1]);
            let tdigits = tdate[tdate.length - 4] + tdate[tdate.length - 3] + tdate[tdate.length - 2] + tdate[tdate.length - 1];
            console.log(tdigits);

            if ((film.name != null || film.name != undefined || isNaN(film.name) != true) && tdigits != document.getElementsByName('yearFilter')[0].value) {

                filmData += `

                <div class="filmCard">
                    <input id="deleteButton" type="button" value="Удалить" onclick="deleteFilm(${i})">
                    <h3 id="fc">Название: ${film.name}</h3>
                    <h3 id="fc">Страна: ${film.country}</h3>
                    <h3 id="fc">Жанр: ${film.genre}</h3>
                    <h3 id="fc">Режиссер(-ы): ${film.producer}</h3>
                    <h3 id="fc">Сценарий:<br> ${film.scenario}</h3>
                    <h3 id="fc">Продюсер(-ы): ${film.director}</h3>
                    <h3 id="fc">Оператор: ${film.operator}</h3>
                    <h3 id="fc">Композитор: ${film.compositor}</h3>
                    <h3 id="fc">Бюджет: ${film.budget}</h3>
                    <h3 id="fc">Сборы: ${film.fees}</h3>
                    <h3 id="fc">Рейтинг возраста: ${film.age_rating}+</h3>
                    <h3 id="fc">Длительность: ${film.duration} минуты</h3>
                    <h3 id="fc">Дата выхода: ${film.date}</h3>
                    <h3 id="fc">Постер:</h3>
                    <img id="fc" src="${film.poster}" />
                </div>

            `;

            }
            else console.log("Фильм с таким номером не прошел по критерию отбора - №", i);
        }
    }

    var html = `${filmData}`;
    htmlCatalogFilms.innerHTML = html;
}