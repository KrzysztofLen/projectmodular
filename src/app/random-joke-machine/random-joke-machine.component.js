/**
 * Created by Hp on 2017-03-11.
 */

const changeBackgroundJokeBox = () => {

    let randomJoke = document.getElementById('random-joke-machine__randomize-btn');

    randomJoke.addEventListener("click", function () {
        $(".random-joke-machine").css({backgroundColor: randomColor()});
    });
}

const getJokeFromAPI = () => {

    let randomJoke = document.getElementById('random-joke-machine__randomize-btn');

    randomJoke.addEventListener("click", function () {

        const request = new XMLHttpRequest();
        request.open('GET', 'http://api.icndb.com/jokes/random', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 404) {
                // Success!
                let data = JSON.parse(request.responseText);
                document.getElementById("random-joke-machine__initial-joke").innerHTML = data.value.joke;
            } else {
                // We reached our target server, but it returned an error
                alert(request.status);
            }
        };
        request.send();
    });

}


const randomColor = () => {

    const jokeBackgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

    const colorIndex = Math.floor(Math.random() * jokeBackgroundColors.length);

    return jokeBackgroundColors[colorIndex];

}

changeBackgroundJokeBox();
getJokeFromAPI();

