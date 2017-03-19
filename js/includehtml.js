// include weather html views
$(function () {
    $(".weatherWidget").load("weatherWidget.html");
    // $(".englishWidget").load("learnEnglishWidget.html");
});

$(document).ready(function () {
    $("#englishWidget").load("learnEnglishWidget.html");
    $("#filterWidget").load("filterWidget.html");
    $('#joke-box').load("randomJokeWidget.html");
    $('#ytBookmarkWidget').load("ytBookmarkWidget.html");
})