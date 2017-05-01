//# TODO Przemyśleć includowanie widoków, skrypty ładują się tylko w html'u pliku (fix this)

//import '../style/materialize.min.css';
import '../sass/style.scss';
import './index';

// // include weather html views
// $(function () {
//     $(".weatherWidget").load("weatherWidget.html");
//     // $(".englishWidget").load("learnEnglishWidget.html");
// });

// const root = document.querySelector('#filterWidget');
// const test = $('#filterWidget').load('../views/filterWidget.html');
// root.innerHTML = test;

$(document).ready(function () {
    $("#englishWidget").load("learnEnglishWidget.html");
    $("#filterWidget").load("filterWidget.html");
    $('#joke-box').load("randomJokeWidget.html");
    $('#ytBookmarkWidget').load("ytBookmarkWidget.html");
    $("#weatherWidget").load("weatherWidget.html");
    $('.card-tab__component').load("components/card-tab.component.html");
})