/**
 * Created by Hp on 2017-03-11.
 */

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];


$(document).ready(function() {

    $("#new_joke").on("click", randColor);
    $("#new_joke").click(function() {
        $.getJSON("http://api.icndb.com/jokes/random", function(json) {

        var joke = json.value.joke;

        document.getElementById("joke__text").innerHTML = joke;

        })
    })
});


function randColor() {
    var color = Math.floor(Math.random() * colors.length);

    for (var i = 0; i < colors.length; i++) {
        var randCol = colors[color];
    }

    $("#joke-box").css({
        backgroundColor: randCol

    }).animate(1000);

    $("#new_joke").css({
        backgroundColor: randCol,
        Color: randCol
    });
}
