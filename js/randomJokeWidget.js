/**
 * Created by Hp on 2017-03-11.
 */


const changeBackgroundJokeBox = () => {

    let randomJoke = document.getElementById('new_joke');

    randomJoke.addEventListener("click", function () {
        $(".random_bg_color").css({backgroundColor: randomColor()});
    });
}

const getJokeFromAPI = () => {

    $("#new_joke").click(function () {
        $.getJSON("http://api.icndb.com/jokes/random", function (json) {

            let joke = json.value.joke;

            document.getElementById("random_joke__text").innerHTML = joke;

        });
    });
}


const randomColor = () => {

    const jokeBackgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

    const color = Math.floor(Math.random() * jokeBackgroundColors.length);

    for (let i = 0; i < jokeBackgroundColors.length; i++) {
        const randCol = jokeBackgroundColors[color];
        return randCol;
    }
}


changeBackgroundJokeBox();
getJokeFromAPI();

