/**
 * Created by Hp on 2017-03-11.
 */


var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];


//
$(document).ready(function() {

    $("#new_quote").on("click", getQuote);
    $("#new_quote").click(function() {
        $.getJSON("http://api.icndb.com/jokes/random", function(json) {

var joke = json.value.joke;


        var num = Math.floor(Math.random() * 5);

        // obj = JSON.parse(text);
        // document.getElementById("author").innerHTML =
        //     obj.quotes[num].author;
        document.getElementById("quote").innerHTML = joke;

        })
    })
});


function getQuote() {
    var color = Math.floor(Math.random() * colors.length);

    for (var i = 0; i < colors.length; i++) {
        var randCol = colors[color];
    }

    $("#quote-box").css({
        backgroundColor: randCol,
        color: randCol
    }).animate(1000);
    $(".button").css({
        backgroundColor: randCol,
    });
}
