//# TODO Przemyśleć includowanie widoków, skrypty ładują się tylko w html'u pliku (fix this)

//import '../style/materialize.min.css';
import '../sass/style.scss';
// import './index';

// // include weather html views
// $(function () {
//     $(".weatherWidget").load("weatherWidget.html");
//     // $(".englishWidget").load("learnEnglishWidget.hbs");
// });

// const root = document.querySelector('#filterWidget');
// const test = $('#filterWidget').load('../views/filterWidget.hbs');
// root.innerHTML = test;

$(document).ready(function () {
    // $('#root').load("views/main.html");
    // $("#englishWidget").load("views/learnEnglishWidget.hbs");
    // $("#filterWidget").load("views/filterWidget.hbs");
    // $("#joke-box").load("views/randomJokeWidget.html");
    // $('#ytBookmarkWidget').load("views/ytBookmarkWidget.html");
    // $("#weatherWidget").load("views/weatherWidget.html");
    // $('.card-tab__component').load("views/components/card-tab.component.html");
    $('#root').load('../views/main.html');
})