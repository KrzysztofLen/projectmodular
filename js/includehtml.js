// include weather html views
$(function () {
    $(".weatherWidget").load("weatherWidget.html");
    // $(".englishWidget").load("learnEnglishWidget.html");
});

$(document).ready(function () {
    $("#englishWidget").load("learnEnglishWidget.html");
    $("#filterWidget").load("filterWidget.html");
    $('#quote-box').load("randomJokeWidget.html");
})